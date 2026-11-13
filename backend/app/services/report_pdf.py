from datetime import datetime, timezone
from io import BytesIO
from typing import Optional
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

from app.models.alert import Alert
from app.models.campaign import Campaign
from app.models.report import Report

HEADER_COLOR = colors.HexColor("#2F3E5C")


def _fmt_date(value) -> str:
    return value.strftime("%d/%m/%Y")


def _fmt_money(value: Optional[float]) -> str:
    return "-" if value is None else f"${value:,.2f}"


def _table_style() -> TableStyle:
    return TableStyle(
        [
            ("BACKGROUND", (0, 0), (-1, 0), HEADER_COLOR),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.lightgrey),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.whitesmoke]),
        ]
    )


def build_report_pdf(
    report: Report,
    campaign: Campaign,
    alerts: list[Alert],
    costo_por_resultado: Optional[float],
) -> bytes:
    """Arma el PDF del reporte y lo devuelve como bytes."""
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        title=f"Reporte {report.id_report} - PulseAlert",
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2 * cm,
    )
    styles = getSampleStyleSheet()
    cell_style = ParagraphStyle("cell", parent=styles["Normal"], fontSize=8, leading=10)

    story = []

    # ----- Encabezado -----
    story.append(Paragraph("Reporte de campaña - PulseAlert", styles["Title"]))
    story.append(Paragraph(f"Campaña: {escape(campaign.nombre)}", styles["Heading2"]))
    story.append(
        Paragraph(
            f"Período: {_fmt_date(report.period_start)} al {_fmt_date(report.period_end)}"
            f" &nbsp;|&nbsp; Canal: {escape(report.channel)}",
            styles["Normal"],
        )
    )
    story.append(Spacer(1, 0.6 * cm))

    # ----- Métricas -----
    story.append(Paragraph("Métricas de la campaña", styles["Heading3"]))
    metrics_data = [
        ["Métrica", "Valor"],
        ["Estado", escape(campaign.estado)],
        ["Presupuesto", _fmt_money(campaign.presupuesto)],
        ["Gasto", _fmt_money(campaign.gasto)],
        ["Impresiones", f"{campaign.impresiones:,}"],
        ["Clics", f"{campaign.clics:,}"],
        ["Resultados", f"{campaign.resultados:,}"],
        ["Costo por resultado", _fmt_money(costo_por_resultado)],
    ]
    metrics_table = Table(metrics_data, colWidths=[7 * cm, 6 * cm], hAlign="LEFT")
    metrics_table.setStyle(_table_style())
    story.append(metrics_table)
    story.append(
        Paragraph(
            "Valores acumulados de la campaña al momento de generar el reporte.",
            styles["Italic"],
        )
    )
    story.append(Spacer(1, 0.6 * cm))

    # ----- Alertas del período -----
    story.append(Paragraph("Alertas del período", styles["Heading3"]))
    if not alerts:
        story.append(Paragraph("No se generaron alertas en este período.", styles["Normal"]))
    else:
        alerts_data = [["Fecha (UTC)", "Métrica", "Valor", "Límite", "Mensaje"]]
        for alert in alerts:
            alerts_data.append(
                [
                    alert.fecha.strftime("%d/%m/%Y %H:%M"),
                    escape(alert.metrica.replace("_", " ")),
                    f"{alert.valor_detectado:,.2f}",
                    f"{alert.limite:,.2f}",
                    # Paragraph permite que el texto largo se ajuste dentro de la celda
                    Paragraph(escape(alert.mensaje), cell_style),
                ]
            )
        alerts_table = Table(
            alerts_data,
            colWidths=[3 * cm, 3 * cm, 2.2 * cm, 2.2 * cm, 6.6 * cm],
            repeatRows=1,
        )
        alerts_table.setStyle(_table_style())
        story.append(alerts_table)

    # ----- Pie -----
    story.append(Spacer(1, 1 * cm))
    generated = datetime.now(timezone.utc).strftime("%d/%m/%Y %H:%M")
    story.append(Paragraph(f"Generado el {generated} (UTC)", styles["Italic"]))

    doc.build(story)
    return buffer.getvalue()
