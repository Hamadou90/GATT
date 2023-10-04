--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

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
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    admin_username character varying,
    admin_email text,
    admin_password text,
    admin_category character varying,
    admin_created_on date,
    admin_updated_on date,
    admin_activated character varying DEFAULT 'Yes'::character varying,
    admin_deleted character varying,
    admin_id bigint NOT NULL
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: admins_id_dmin_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_id_dmin_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admins_id_dmin_seq OWNER TO postgres;

--
-- Name: admins_id_dmin_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_id_dmin_seq OWNED BY public.admins.admin_id;


--
-- Name: directions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directions (
    direction_id bigint NOT NULL,
    direction_acronym character varying NOT NULL,
    direction_name text NOT NULL,
    director_id bigint NOT NULL,
    direction_created_on date DEFAULT now() NOT NULL
);


ALTER TABLE public.directions OWNER TO postgres;

--
-- Name: directions_direction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directions_direction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directions_direction_id_seq OWNER TO postgres;

--
-- Name: directions_direction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directions_direction_id_seq OWNED BY public.directions.direction_id;


--
-- Name: staffcomments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staffcomments (
    staffcomment_id bigint NOT NULL,
    description text,
    createdon date DEFAULT now(),
    updatedon date,
    task_id bigint,
    user_id bigint,
    task_accomplished character varying DEFAULT 'No'::character varying
);


ALTER TABLE public.staffcomments OWNER TO postgres;

--
-- Name: staffcomments_staffcomment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.staffcomments_staffcomment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.staffcomments_staffcomment_id_seq OWNER TO postgres;

--
-- Name: staffcomments_staffcomment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.staffcomments_staffcomment_id_seq OWNED BY public.staffcomments.staffcomment_id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    task_id bigint NOT NULL,
    created_on date DEFAULT now(),
    status character varying DEFAULT 'Under Process'::character varying,
    comment_director text,
    taskslug character varying,
    tasktitle character varying,
    starting_date timestamp with time zone,
    ending_date timestamp without time zone,
    updated_on date,
    tasktype character varying DEFAULT 'Individual'::character varying,
    teamleader_id bigint,
    task_deleted character varying DEFAULT 'No'::character varying NOT NULL
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: COLUMN tasks.comment_director; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.tasks.comment_director IS 'comments of the Director';


--
-- Name: COLUMN tasks.taskslug; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.tasks.taskslug IS 'Slug of the task to be used as uri.';


--
-- Name: COLUMN tasks.starting_date; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.tasks.starting_date IS 'Starting date and time of the task to be accomplished.';


--
-- Name: COLUMN tasks.ending_date; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.tasks.ending_date IS 'Ending date and time of the task to be accomplished.';


--
-- Name: COLUMN tasks.updated_on; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.tasks.updated_on IS 'Date and time of updation of the created task';


--
-- Name: COLUMN tasks.task_deleted; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.tasks.task_deleted IS 'Field specifying if the task has been deleted or not.';


--
-- Name: tasks_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_task_id_seq OWNER TO postgres;

--
-- Name: tasks_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_task_id_seq OWNED BY public.tasks.task_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    username character varying NOT NULL,
    email text,
    password text NOT NULL,
    category character varying DEFAULT 'Simple User'::character varying NOT NULL,
    created_on date DEFAULT now(),
    updated_on date DEFAULT now(),
    activated character varying DEFAULT 'No'::character varying,
    deleted character varying DEFAULT 'No'::character varying NOT NULL,
    direction_id bigint
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: COLUMN users.category; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.category IS 'category of the user (either ''Admin'' or ''Simple User'')';


--
-- Name: COLUMN users.created_on; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.created_on IS 'Date and time of creation of the user';


--
-- Name: COLUMN users.updated_on; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.updated_on IS 'Date and time of updation of the user';


--
-- Name: COLUMN users.activated; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.activated IS 'Checker whether the account is activated or not.';


--
-- Name: COLUMN users.deleted; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.deleted IS 'Field specifying if the account is deleted or not.';


--
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_user_seq OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.user_id;


--
-- Name: admins admin_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN admin_id SET DEFAULT nextval('public.admins_id_dmin_seq'::regclass);


--
-- Name: directions direction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directions ALTER COLUMN direction_id SET DEFAULT nextval('public.directions_direction_id_seq'::regclass);


--
-- Name: staffcomments staffcomment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staffcomments ALTER COLUMN staffcomment_id SET DEFAULT nextval('public.staffcomments_staffcomment_id_seq'::regclass);


--
-- Name: tasks task_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN task_id SET DEFAULT nextval('public.tasks_task_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_id_user_seq'::regclass);


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (admin_username, admin_email, admin_password, admin_category, admin_created_on, admin_updated_on, admin_activated, admin_deleted, admin_id) FROM stdin;
Administrateur	admin.admin@gmail.com	U2FsdGVkX18lZHpFD2GGrkoVkjP+xHup9PzJR6Gzd90=	\N	2023-09-19	\N	Yes	\N	1
\.


--
-- Data for Name: directions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directions (direction_id, direction_acronym, direction_name, director_id, direction_created_on) FROM stdin;
1	DSN	Direction de la Santé Numérique	5	2023-09-21
2	DRH/MSPPAS	Direction des Ressources Humaines	7	2023-09-21
8	DAID/RP	Direction des Archives, de l'Information, de la Documentation et des Relations Publiques	0	2023-09-25
\.


--
-- Data for Name: staffcomments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staffcomments (staffcomment_id, description, createdon, updatedon, task_id, user_id, task_accomplished) FROM stdin;
2	\N	\N	\N	11	1	No
1	Système installé correctement Monsieur le Directeur.	\N	\N	9	2	No
6	\N	\N	\N	13	2	No
7	\N	\N	\N	14	2	No
8	\N	\N	\N	15	2	No
9	\N	\N	\N	16	1	No
10	\N	\N	\N	16	3	No
11	\N	\N	\N	16	2	No
12	\N	\N	\N	17	2	No
13	\N	\N	\N	18	2	No
14	\N	\N	\N	18	4	No
15	\N	\N	\N	18	1	No
16	\N	2023-09-01	\N	19	2	No
17	\N	2023-09-01	\N	19	1	No
18	\N	2023-09-01	\N	19	3	No
19	\N	2023-09-01	\N	20	2	No
20	\N	2023-09-01	\N	20	4	No
21	\N	2023-09-01	\N	20	3	No
22	\N	2023-09-01	\N	21	4	No
23	\N	2023-09-01	\N	22	2	No
24	\N	2023-09-01	\N	22	3	No
25	\N	2023-09-01	\N	22	4	No
26	\N	2023-09-04	\N	23	2	No
27	\N	2023-09-04	\N	23	1	No
28	\N	2023-09-04	\N	23	3	No
29	\N	2023-09-04	\N	24	6	No
33	\N	2023-09-12	\N	26	6	Yes
34	\N	2023-09-12	\N	26	2	Yes
35	\N	2023-09-12	\N	26	5	Yes
36	\N	2023-09-12	\N	26	4	Yes
37	\N	2023-09-12	\N	27	5	Yes
30	\N	2023-09-11	\N	25	6	Yes
31	\N	2023-09-11	\N	25	5	Yes
32	\N	2023-09-11	\N	25	2	Yes
38	\N	2023-09-13	\N	28	6	Yes
39	\N	2023-09-13	\N	29	2	No
40	\N	2023-09-13	\N	29	6	No
41	\N	2023-09-13	\N	29	4	No
72	\N	2023-09-13	\N	62	7	Yes
74	\N	2023-09-13	\N	62	4	Yes
73	\N	2023-09-13	\N	62	2	Yes
75	\N	2023-09-13	\N	62	6	Yes
80	Le système est en quelques sortes valide.	2023-09-20	\N	64	40	No
78	La mise à jour est toujours en cours avec les modifications suivantes apportées:\n   1. Responsable de tâche spécifiée;\n   2. Commenter une tâche opérationnel;\n   3. Signaler au Directeur comme Tâchée effectuée;\n   4. Visualiser les détails de la tâche opérationnel.\n\nDate: 18 Septembre 2023.	2023-09-18	\N	63	7	Yes
77	La mise à jour est toujours en cours avec les modifications suivantes apportées:\n   1. Responsable de tâche spécifiée;\n   2. Commenter une tâche opérationnel;\n   3. Signaler au Directeur comme Tâchée effectuée;\n   4. Visualiser les détails de la tâche opérationnel.\n\nDate: 18 Septembre 2023.	2023-09-18	\N	63	2	Yes
79	La mise à jour est toujours en cours avec les modifications suivantes apportées:\n   1. Responsable de tâche spécifiée;\n   2. Commenter une tâche opérationnel;\n   3. Signaler au Directeur comme Tâchée effectuée;\n   4. Visualiser les détails de la tâche opérationnel.\n\nDate: 18 Septembre 2023.	2023-09-18	\N	63	4	Yes
76	La mise à jour est toujours en cours avec les modifications suivantes apportées:\n   1. Responsable de tâche spécifiée;\n   2. Commenter une tâche opérationnel;\n   3. Signaler au Directeur comme Tâchée effectuée;\n   4. Visualiser les détails de la tâche opérationnel.\n\nDate: 18 Septembre 2023.	2023-09-18	\N	63	6	Yes
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (task_id, created_on, status, comment_director, taskslug, tasktitle, starting_date, ending_date, updated_on, tasktype, teamleader_id, task_deleted) FROM stdin;
62	2023-09-13	Under Process	Réaliser svp!	\N	FeedBack sur le projet GAT 2.	2023-09-13 17:26:00+02	2023-09-14 15:26:00	\N	Collective	7	No
64	2023-09-20	Under Process	Il faut faire le briefing du système!	\N	Vérification du système d'assignation des tâches	2023-09-20 09:44:00+02	2023-09-20 09:44:00	\N	Individual	40	No
18	2023-09-01	Under Process	Vous êtes chargés de réaliser le projet du dossier patient le plus tôt possible, merci.	\N	Réalisation du projet du Dossier Patient.	2023-09-04 08:50:00+02	2023-09-30 12:50:00	\N	Collective	2	No
19	2023-09-01	Under Process	Il faut faire l'achat des onduleurs.	\N	Achat d'onduleur	2023-09-05 09:12:00+02	2023-09-07 09:12:00	\N	Collective	2	No
22	2023-09-01	Under Process	Tâche collective tester.	\N	Tâche Collective Test	2023-09-12 09:35:00+02	2023-09-14 09:40:00	\N	Collective	2	No
21	2023-09-01	Under Process	Test de tâche individuelle	\N	Tache Individuelle test	2023-09-05 09:29:00+02	2023-09-14 09:29:00	\N	Individual	4	No
25	2023-09-11	Under Process	Configurez le serveur Tomcat 7 pour l'hébergement de OpenMRS, merci.	\N	Configuration de Serveur Tomcat7	2023-09-11 09:00:00+02	2023-09-12 09:00:00	\N	Collective	6	No
20	2023-09-01	Finished	Il faut acheter et installer les onduleurs dans la salle serveur.	\N	Achat et installation des onduleurs	2023-09-04 09:24:00+02	2023-09-07 09:24:00	\N	Collective	2	No
23	2023-09-04	Finished	Il faut tout faire pour sécuriser la salle serveur la!	\N	Sécurisation de la salle serveur.	2023-09-05 08:00:00+02	2023-09-12 10:04:00	\N	Collective	2	No
24	2023-09-04	Finished	Il faut essayer d'avoir même si c'est un sample du projet.	\N	Réalisation du projet Dossier Patient.	2023-09-04 08:00:00+02	2023-10-04 08:00:00	\N	Individual	6	No
27	2023-09-12	Finished	Je voudrai à ce que vous formiez les agents de la DSN/MSPPAS sur le système d'exploitation Linux.\nMerci d'avance.	\N	Formation sur Linux OS	2023-09-13 08:00:00+02	2023-09-19 17:00:00	\N	Individual	5	No
26	2023-09-12	Finished	Je vous désigne pour aller assister à l'atelier de formation du Microprogramme du MSP/P/AS à Zinder.	\N	Atelier de Formation sur Micropramme	2023-09-12 10:00:00+02	2023-09-14 17:30:00	\N	Collective	6	No
28	2023-09-13	Finished	Il faut finaliser le projet si tôt pssible!	\N	Finaliser le projet Gestion des Tâches	2023-09-13 13:49:00+02	2023-09-30 13:50:00	\N	Individual	6	No
29	2023-09-13	Under Process	Essayer de lui donner votre feedback, merci.	\N	FeedBack Sur le projet GAT	2023-09-13 16:48:00+02	2023-09-13 17:50:00	\N	Collective	2	No
63	2023-09-18	Under Process	Mettez à jour le projet Gestion d'Assignation des Tâches en tenant en compte les Statuts des tâches, le texte à afficher sur l'avant-plan pour le moment.\n\nMerci bien et du courage !!!\n\n	\N	Mise à jour du projet GAT.	2023-09-18 11:24:00+02	2023-09-22 11:24:00	\N	Collective	6	No
17	2023-09-01	Under Process	Achetez les ordinateurs Lenovo, c'est mieux!	\N	Achat d'ordinateurs portable Lenovo	2023-09-04 08:50:00+02	2023-09-04 11:50:00	\N	Individual	2	No
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, email, password, category, created_on, updated_on, activated, deleted, direction_id) FROM stdin;
2	Boureima Hassane	boureimahassane@gmail.com	boureima	Simple User	2023-08-23	\N	Yes	No	1
4	Ousseini Moussa	ousseini@gmail.com	ousseini	Simple User	2023-08-25	\N	No	No	1
3	HP EliteBook	hp@hpelitebook.com	hp	Simple User	2023-08-23	\N	No	No	1
6	Hamadou Moustapha	hamadoumoustapha65@gmail.com	U2FsdGVkX19W9pkCtaShwjboA/abgWv5wT/hZAWURm8=	Simple User	2023-09-04	\N	Yes	No	1
7	Ilyassou Soumeila	ilyassou.soumeila@gmail.com	U2FsdGVkX1+uHKrWvMyin7dI7vT3vh72IXL7kCABG7qDGq00ERWCa/MhbhI9bCdj	Simple User	2023-09-13	\N	Yes	No	1
40	Sani Mamane	sani.mamane@gmail.com	U2FsdGVkX19VRjSWyrht3buY/fLI/uFvO4VB+Z3f+/k=	Simple User	2023-09-20	\N	Yes	No	1
5	Seydou Maman Rabiou	seydourabiou@gmail.com	U2FsdGVkX19QcHyieV+Na/CF9pOrGJDDXCzmDF6i8yQ=	Director	2023-09-04	\N	Yes	No	1
44	Ousseina Hassane	ousseina.hassane@gmail.com	U2FsdGVkX1+C3rPq4MX+iwQLpAuPgmApamHVj7BwKZ105f2hq/NulrhxZUiQbzJR	Simple User	2023-09-23	2023-09-24	No	No	1
\.


--
-- Name: admins_id_dmin_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_id_dmin_seq', 1, true);


--
-- Name: directions_direction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directions_direction_id_seq', 8, true);


--
-- Name: staffcomments_staffcomment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.staffcomments_staffcomment_id_seq', 80, true);


--
-- Name: tasks_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_task_id_seq', 64, true);


--
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_user_seq', 44, true);


--
-- Name: directions directions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directions
    ADD CONSTRAINT directions_pkey PRIMARY KEY (direction_id);


--
-- Name: staffcomments staffcomments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staffcomments
    ADD CONSTRAINT staffcomments_pkey PRIMARY KEY (staffcomment_id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (task_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

