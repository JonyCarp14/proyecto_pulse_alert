--
-- PostgreSQL database dump
--

\restrict fUvVr1Jhw79dGqMRIZj93BbKINVnk0aEKetJr332KGWKzAR0uQaUlKZdg6JwWc6

-- Dumped from database version 15.19
-- Dumped by pg_dump version 15.19

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


--
-- Name: alerts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alerts (
    id_alert integer NOT NULL,
    campaign_id integer NOT NULL,
    tipo character varying(50) NOT NULL,
    mensaje character varying(255) NOT NULL,
    fecha timestamp with time zone NOT NULL,
    leida boolean NOT NULL,
    metrica character varying(50) NOT NULL,
    valor_detectado double precision NOT NULL,
    limite double precision NOT NULL,
    estado_envio character varying(20) DEFAULT 'pendiente'::character varying NOT NULL,
    regla_id integer
);


--
-- Name: alerts_id_alert_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.alerts_id_alert_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: alerts_id_alert_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.alerts_id_alert_seq OWNED BY public.alerts.id_alert;


--
-- Name: campaign_metrics_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaign_metrics_history (
    id_history integer NOT NULL,
    campaign_id integer NOT NULL,
    fecha date NOT NULL,
    clics integer DEFAULT 0 NOT NULL,
    impresiones integer DEFAULT 0 NOT NULL,
    gasto numeric(12,2) DEFAULT 0 NOT NULL,
    resultados integer DEFAULT 0 NOT NULL
);


--
-- Name: campaign_metrics_history_id_history_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.campaign_metrics_history_id_history_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: campaign_metrics_history_id_history_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.campaign_metrics_history_id_history_seq OWNED BY public.campaign_metrics_history.id_history;


--
-- Name: campaigns; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaigns (
    id_campaign integer NOT NULL,
    usuario_id integer NOT NULL,
    meta_campaign_id character varying(100),
    nombre character varying(150) NOT NULL,
    presupuesto double precision NOT NULL,
    gasto double precision NOT NULL,
    impresiones integer NOT NULL,
    clics integer NOT NULL,
    estado character varying(20) NOT NULL,
    cuenta_publicitaria character varying(100),
    resultados integer DEFAULT 0
);


--
-- Name: campaigns_id_campaign_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.campaigns_id_campaign_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: campaigns_id_campaign_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.campaigns_id_campaign_seq OWNED BY public.campaigns.id_campaign;


--
-- Name: reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reports (
    id_report integer NOT NULL,
    campaign_id integer NOT NULL,
    period_start date NOT NULL,
    period_end date NOT NULL,
    channel character varying(20) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    message_status character varying(20) DEFAULT 'pendiente'::character varying NOT NULL
);


--
-- Name: reports_id_report_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reports_id_report_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reports_id_report_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reports_id_report_seq OWNED BY public.reports.id_report;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuarios (
    id_user integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password_hash character varying(255) NOT NULL,
    rol character varying(20) NOT NULL,
    plan character varying(20) DEFAULT 'free'::character varying NOT NULL
);


--
-- Name: usuarios_id_user_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuarios_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usuarios_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuarios_id_user_seq OWNED BY public.usuarios.id_user;


--
-- Name: alerts id_alert; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alerts ALTER COLUMN id_alert SET DEFAULT nextval('public.alerts_id_alert_seq'::regclass);


--
-- Name: campaign_metrics_history id_history; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_metrics_history ALTER COLUMN id_history SET DEFAULT nextval('public.campaign_metrics_history_id_history_seq'::regclass);


--
-- Name: campaigns id_campaign; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns ALTER COLUMN id_campaign SET DEFAULT nextval('public.campaigns_id_campaign_seq'::regclass);


--
-- Name: reports id_report; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports ALTER COLUMN id_report SET DEFAULT nextval('public.reports_id_report_seq'::regclass);


--
-- Name: usuarios id_user; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_user SET DEFAULT nextval('public.usuarios_id_user_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alembic_version (version_num) FROM stdin;
962ad32e3c03
\.


--
-- Data for Name: alerts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alerts (id_alert, campaign_id, tipo, mensaje, fecha, leida, metrica, valor_detectado, limite, estado_envio, regla_id) FROM stdin;
1	1	limite_superado	Prueba de Telegram: presupuesto excedido en la campaña de Carlos.	2026-11-12 23:45:52.97403+00	f	gasto	12000	10000	enviada	\N
2	2	limite_superado	Black Friday Instagram superó el presupuesto.	2026-11-12 01:45:22.50939+00	f	gasto	65000	60000	pendiente	\N
3	3	limite_superado	Promoción Facebook superó el límite de gasto.	2026-11-11 01:45:22.50939+00	f	gasto	42000	40000	pendiente	\N
4	4	limite_superado	Campaña Verano superó el límite de clics.	2026-11-10 01:45:22.50939+00	t	clics	4500	4000	pendiente	\N
5	5	campania_pausada	Remarketing Clientes se encuentra pausada.	2026-11-09 01:45:22.50939+00	f	estado	0	1	pendiente	\N
6	6	limite_superado	Lanzamiento Producto superó el límite de clics.	2026-11-12 01:45:22.50939+00	f	clics	5600	5000	pendiente	\N
7	7	limite_superado	Campaña Navidad superó el límite de gasto.	2026-11-11 01:45:22.50939+00	f	gasto	125000	120000	pendiente	\N
8	8	limite_superado	Promoción Ecommerce superó el límite de impresiones.	2026-11-10 01:45:22.50939+00	t	impresiones	97000	90000	pendiente	\N
9	9	campania_pausada	Remarketing Premium se encuentra pausada.	2026-11-09 01:45:22.50939+00	f	estado	0	1	pendiente	\N
10	10	limite_superado	Ofertas Especiales superó el límite de resultados.	2026-11-13 01:45:22.50939+00	f	resultados	295	250	pendiente	\N
\.


--
-- Data for Name: campaign_metrics_history; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaign_metrics_history (id_history, campaign_id, fecha, clics, impresiones, gasto, resultados) FROM stdin;
1	1	2026-11-06	100	3000	500.00	8
2	1	2026-11-07	120	3500	600.00	10
3	1	2026-11-08	90	2800	450.00	7
4	1	2026-11-09	150	4200	700.00	12
5	1	2026-11-10	180	5100	800.00	15
6	1	2026-11-11	110	3200	550.00	9
7	1	2026-11-12	130	3900	650.00	11
9	2	2026-11-12	239	6650	1115.00	25
10	3	2026-11-12	251	6950	1160.00	26
11	4	2026-11-12	263	7250	1205.00	27
12	5	2026-11-12	275	7550	1250.00	28
13	6	2026-11-12	287	7850	1295.00	29
14	7	2026-11-12	299	8150	1340.00	30
15	8	2026-11-12	311	8450	1385.00	31
16	9	2026-11-12	323	8750	1430.00	32
17	10	2026-11-12	335	9050	1475.00	33
19	2	2026-11-11	224	6200	1040.00	23
20	3	2026-11-11	236	6500	1085.00	24
21	4	2026-11-11	248	6800	1130.00	25
22	5	2026-11-11	260	7100	1175.00	26
23	6	2026-11-11	272	7400	1220.00	27
24	7	2026-11-11	284	7700	1265.00	28
25	8	2026-11-11	296	8000	1310.00	29
26	9	2026-11-11	308	8300	1355.00	30
27	10	2026-11-11	320	8600	1400.00	31
29	2	2026-11-10	209	5750	965.00	21
30	3	2026-11-10	221	6050	1010.00	22
31	4	2026-11-10	233	6350	1055.00	23
32	5	2026-11-10	245	6650	1100.00	24
33	6	2026-11-10	257	6950	1145.00	25
34	7	2026-11-10	269	7250	1190.00	26
35	8	2026-11-10	281	7550	1235.00	27
36	9	2026-11-10	293	7850	1280.00	28
37	10	2026-11-10	305	8150	1325.00	29
39	2	2026-11-09	194	5300	890.00	19
40	3	2026-11-09	206	5600	935.00	20
41	4	2026-11-09	218	5900	980.00	21
42	5	2026-11-09	230	6200	1025.00	22
43	6	2026-11-09	242	6500	1070.00	23
44	7	2026-11-09	254	6800	1115.00	24
45	8	2026-11-09	266	7100	1160.00	25
46	9	2026-11-09	278	7400	1205.00	26
47	10	2026-11-09	290	7700	1250.00	27
49	2	2026-11-08	179	4850	815.00	17
50	3	2026-11-08	191	5150	860.00	18
51	4	2026-11-08	203	5450	905.00	19
52	5	2026-11-08	215	5750	950.00	20
53	6	2026-11-08	227	6050	995.00	21
54	7	2026-11-08	239	6350	1040.00	22
55	8	2026-11-08	251	6650	1085.00	23
56	9	2026-11-08	263	6950	1130.00	24
57	10	2026-11-08	275	7250	1175.00	25
59	2	2026-11-07	164	4400	740.00	15
60	3	2026-11-07	176	4700	785.00	16
61	4	2026-11-07	188	5000	830.00	17
62	5	2026-11-07	200	5300	875.00	18
63	6	2026-11-07	212	5600	920.00	19
64	7	2026-11-07	224	5900	965.00	20
65	8	2026-11-07	236	6200	1010.00	21
66	9	2026-11-07	248	6500	1055.00	22
67	10	2026-11-07	260	6800	1100.00	23
69	2	2026-11-06	149	3950	665.00	13
70	3	2026-11-06	161	4250	710.00	14
71	4	2026-11-06	173	4550	755.00	15
72	5	2026-11-06	185	4850	800.00	16
73	6	2026-11-06	197	5150	845.00	17
74	7	2026-11-06	209	5450	890.00	18
75	8	2026-11-06	221	5750	935.00	19
76	9	2026-11-06	233	6050	980.00	20
77	10	2026-11-06	245	6350	1025.00	21
78	1	2026-11-05	122	3200	545.00	10
79	2	2026-11-05	134	3500	590.00	11
80	3	2026-11-05	146	3800	635.00	12
81	4	2026-11-05	158	4100	680.00	13
82	5	2026-11-05	170	4400	725.00	14
83	6	2026-11-05	182	4700	770.00	15
84	7	2026-11-05	194	5000	815.00	16
85	8	2026-11-05	206	5300	860.00	17
86	9	2026-11-05	218	5600	905.00	18
87	10	2026-11-05	230	5900	950.00	19
88	1	2026-11-04	107	2750	470.00	8
89	2	2026-11-04	119	3050	515.00	9
90	3	2026-11-04	131	3350	560.00	10
91	4	2026-11-04	143	3650	605.00	11
92	5	2026-11-04	155	3950	650.00	12
93	6	2026-11-04	167	4250	695.00	13
94	7	2026-11-04	179	4550	740.00	14
95	8	2026-11-04	191	4850	785.00	15
96	9	2026-11-04	203	5150	830.00	16
97	10	2026-11-04	215	5450	875.00	17
98	1	2026-11-03	92	2300	395.00	6
99	2	2026-11-03	104	2600	440.00	7
100	3	2026-11-03	116	2900	485.00	8
101	4	2026-11-03	128	3200	530.00	9
102	5	2026-11-03	140	3500	575.00	10
103	6	2026-11-03	152	3800	620.00	11
104	7	2026-11-03	164	4100	665.00	12
105	8	2026-11-03	176	4400	710.00	13
106	9	2026-11-03	188	4700	755.00	14
107	10	2026-11-03	200	5000	800.00	15
\.


--
-- Data for Name: campaigns; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaigns (id_campaign, usuario_id, meta_campaign_id, nombre, presupuesto, gasto, impresiones, clics, estado, cuenta_publicitaria, resultados) FROM stdin;
1	1	META_TEST_001	Campaña de prueba PulseAlert	10000	2500	5000	150	activa	CUENTA_TEST_001	20
2	1	META-F001	Black Friday Instagram	100000	65000	85000	3200	activa	META-CARLOS	145
3	1	META-F002	Promoción Facebook	80000	42000	62000	2100	activa	META-CARLOS	98
4	1	META-F003	Campaña Verano	120000	95000	110000	4500	activa	META-CARLOS	210
5	1	META-F004	Remarketing Clientes	60000	58000	48000	1800	pausada	META-CARLOS	75
6	4	META-P001	Lanzamiento Producto	150000	87000	125000	5600	activa	META-PEDRO	280
7	4	META-P002	Campaña Navidad	200000	125000	180000	7200	activa	META-PEDRO	350
8	4	META-P003	Promoción Ecommerce	95000	72000	97000	3900	activa	META-PEDRO	185
9	4	META-P004	Remarketing Premium	75000	69000	73000	3100	pausada	META-PEDRO	160
10	4	META-P005	Ofertas Especiales	130000	102000	145000	6100	activa	META-PEDRO	295
\.


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reports (id_report, campaign_id, period_start, period_end, channel, created_at, message_status) FROM stdin;
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.usuarios (id_user, nombre, apellido, email, password_hash, rol, plan) FROM stdin;
2	Admin	PulseAlert	admin@pulsealert.com	$argon2id$v=19$m=65536,t=3,p=4$uup2DeikJ33SLTD9pE8baA$Q+38oJ5+ZYPDTrkwwFO8Kxst7J+XlJ9jVkiXUozs5GI	admin	free
1	CarlosTest	Gomez	carlos.prueba@example.com	$argon2id$v=19$m=65536,t=3,p=4$r6JxOUyrAX/AK089d/4rGA$VTzwz8WM4O90f6HBCyP6+QHO+/tRR5X/EPAuxw5Uwzs	user	free
4	Pedro	Prueba	pedro.prueba@example.com	$argon2id$v=19$m=65536,t=3,p=4$p+0QwqUdjn9c0NDGsGJTXQ$vOjxamt5c7/6MyYwwwtq2w5SC4Ajk59zAfMeR0Btmtg	user	premium
\.


--
-- Name: alerts_id_alert_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alerts_id_alert_seq', 10, true);


--
-- Name: campaign_metrics_history_id_history_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.campaign_metrics_history_id_history_seq', 207, true);


--
-- Name: campaigns_id_campaign_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.campaigns_id_campaign_seq', 10, true);


--
-- Name: reports_id_report_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reports_id_report_seq', 1, false);


--
-- Name: usuarios_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_id_user_seq', 4, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: alerts alerts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alerts
    ADD CONSTRAINT alerts_pkey PRIMARY KEY (id_alert);


--
-- Name: campaign_metrics_history campaign_metrics_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_metrics_history
    ADD CONSTRAINT campaign_metrics_history_pkey PRIMARY KEY (id_history);


--
-- Name: campaigns campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (id_campaign);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id_report);


--
-- Name: campaign_metrics_history uq_campaign_metrics_date; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_metrics_history
    ADD CONSTRAINT uq_campaign_metrics_date UNIQUE (campaign_id, fecha);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_user);


--
-- Name: ix_alerts_id_alert; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_alerts_id_alert ON public.alerts USING btree (id_alert);


--
-- Name: ix_campaigns_id_campaign; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_campaigns_id_campaign ON public.campaigns USING btree (id_campaign);


--
-- Name: ix_usuarios_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ix_usuarios_email ON public.usuarios USING btree (email);


--
-- Name: ix_usuarios_id_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_usuarios_id_user ON public.usuarios USING btree (id_user);


--
-- Name: alerts alerts_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alerts
    ADD CONSTRAINT alerts_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id_campaign);


--
-- Name: campaigns campaigns_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id_user);


--
-- Name: campaign_metrics_history fk_history_campaign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaign_metrics_history
    ADD CONSTRAINT fk_history_campaign FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id_campaign) ON DELETE CASCADE;


--
-- Name: reports fk_reports_campaign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT fk_reports_campaign FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id_campaign);


--
-- PostgreSQL database dump complete
--

\unrestrict fUvVr1Jhw79dGqMRIZj93BbKINVnk0aEKetJr332KGWKzAR0uQaUlKZdg6JwWc6

