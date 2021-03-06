CREATE OR REPLACE FUNCTION public.client_insert(
	__p_name character varying,
	__p_ruc character varying,
	__p_address character varying,
	__p_person_id_register integer,
	__p_projects integer[])
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
	-- Constants
	__MSG_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
	
	-- Variables
	__result JSONB;
	__msg_excep CHARACTER VARYING;
	__client_id INTEGER;
	__project_id INTEGER;
	__date_register TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW();
	__row_count INTEGER;
BEGIN

	INSERT INTO client ("name", address, ruc, person_id_register, date_register)
		 VALUES (__p_name, __p_address, __p_ruc, __p_person_id_register, __date_register)
	  RETURNING client_id
	       INTO __client_id;
		   
	GET DIAGNOSTICS __row_count = ROW_COUNT;
	IF __row_count = 0 THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'Error al regsitrar';
	END IF;
	
	IF (SELECT ARRAY_LENGTH(__p_projects,1)) IS NOT NULL THEN
		FOR __project_id IN (SELECT UNNEST(__p_projects))
		LOOP
		RAISE NOTICE '4';
			INSERT INTO project_x_client (_project_id, _client_id, person_id_register, date_register)
			     VALUES (__project_id, __client_id, __p_person_id_register, __date_register);
		END LOOP;
	 END IF;
	 
	__result := JSONB_BUILD_OBJECT(
		'msj' , 'Se registró'
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msg_excep));
        RETURN __result;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.client_update(
	__p_name character varying,
	__p_ruc character varying,
	__p_address character varying,
	__p_person_id_register integer,
	__p_projects integer[],
	__p_client_id integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
	-- Constants
	__MSG_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
	
	-- Variables
	__result JSONB;
	__msg_excep CHARACTER VARYING;
	__project_id INTEGER;
	__date_register TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW();
	__row_count INTEGER;
BEGIN

	UPDATE client 
	   SET "name"  = __p_name, 
	       address = __p_address,
		   ruc     = __p_ruc
	 WHERE client_id = __p_client_id;
		   
	GET DIAGNOSTICS __row_count = ROW_COUNT;
	IF __row_count = 0 THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'Error al editar';
	END IF;
	
	IF (SELECT ARRAY_LENGTH(__p_projects,1)) IS NOT NULL THEN
		
		DELETE FROM project_x_client 
			  WHERE _client_id = __p_client_id
				AND _project_id <> ALL(__p_projects);

		FOR __project_id IN (SELECT UNNEST(__p_projects))
		LOOP
		
			SELECT COUNT(1)
			  INTO __row_count
			  FROM project_x_client
			 WHERE _client_id  = __p_client_id
			   AND _project_id = __project_id;
			   
			IF __row_count = 0 THEN
				INSERT INTO project_x_client (_project_id, _client_id, person_id_register, date_register)
					 VALUES (__project_id, __p_client_id, __p_person_id_register, __date_register);
			END IF;
			
		END LOOP;
	 ELSE
	 	DELETE FROM project_x_client WHERE _client_id = __p_client_id;
	 END IF;
	 
	__result := JSONB_BUILD_OBJECT(
		'msg' , 'Se editó'
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msg_excep));
        RETURN __result;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.client_delete(
	__p_client_id integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
	-- Constants
	__MSG_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
	
	-- Variables
	__result JSONB;
	__msg_excep CHARACTER VARYING;
BEGIN

	DELETE FROM project_x_client 
	      WHERE _client_id = __p_client_id;
		  
	DELETE FROM client
	      WHERE client_id = __p_client_id;
	 
	__result := JSONB_BUILD_OBJECT(
		'msg' , 'Se eliminó'
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msg_excep));
        RETURN __result;
END;
$BODY$;

-- FUNCTION: public.project_insert(character varying, character varying, character varying, integer[], integer)

-- DROP FUNCTION public.project_insert(character varying, character varying, character varying, integer[], integer);

CREATE OR REPLACE FUNCTION public.project_insert(
	__p_name character varying,
	__p_duration character varying,
	__p_address character varying,
	__p_clients integer[],
	__p_person_id_register integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
	-- Constants
	__MSG_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
	
	-- Variables
	__result JSONB;
	__msg_excep CHARACTER VARYING;
	__project_id INTEGER;
	__client_id INTEGER;
	__date_register TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW();
	__row_count INTEGER;
BEGIN

	INSERT INTO project ("name", address, duration, person_id_register, date_register)
		 VALUES (__p_name, __p_address, __p_duration, __p_person_id_register, __date_register)
	  RETURNING project_id
	       INTO __project_id;
		   
	GET DIAGNOSTICS __row_count = ROW_COUNT;
	IF __row_count = 0 THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'Error al regsitrar';
	END IF;
	
	IF (SELECT ARRAY_LENGTH(__p_clients,1)) IS NOT NULL THEN
		FOR __client_id IN (SELECT UNNEST(__p_clients))
		LOOP
			INSERT INTO project_x_client (_project_id, _client_id, person_id_register, date_register)
			     VALUES (__project_id, __client_id, __p_person_id_register, __date_register);
		END LOOP;
	 END IF;
	 
	__result := JSONB_BUILD_OBJECT(
		'msg' , 'Se registró',
		'id', __project_id
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msg_excep));
        RETURN __result;
END;
$BODY$;


CREATE OR REPLACE FUNCTION public.project_update(
	__p_name character varying,
	__p_duration character varying,
	__p_address character varying,
	__p_clients integer[],
	__p_person_id_register integer,
	__p_project_id integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
	-- Constants
	__MSG_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
	
	-- Variables
	__result JSONB;
	__msg_excep CHARACTER VARYING;
	__client_id INTEGER;
	__date_register TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW();
	__row_count INTEGER;
BEGIN

	UPDATE project 
	   SET "name"     = __p_name, 
	       duration   = __p_duration,
		   address    = __p_address
	 WHERE project_id = __p_project_id;
		   
	GET DIAGNOSTICS __row_count = ROW_COUNT;
	IF __row_count = 0 THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'Error al editar';
	END IF;
	
	IF (SELECT ARRAY_LENGTH(__p_clients,1)) IS NOT NULL THEN
		
		DELETE FROM project_x_client 
			  WHERE _project_id = __p_project_id
				AND _client_id <> ALL(__p_clients);

		FOR __client_id IN (SELECT UNNEST(__p_clients))
		LOOP
		
			SELECT COUNT(1)
			  INTO __row_count
			  FROM project_x_client
			 WHERE _project_id  = __p_project_id
			   AND _client_id = __client_id;
			   
			IF __row_count = 0 THEN
				INSERT INTO project_x_client (_project_id, _client_id, person_id_register, date_register)
					 VALUES (__p_project_id, __client_id, __p_person_id_register, __date_register);
			END IF;
			
		END LOOP;
	 ELSE
	 	DELETE FROM project_x_client WHERE _project_id = __p_project_id;
	 END IF;
	 
	__result := JSONB_BUILD_OBJECT(
		'msg' , 'Se editó'
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msg_excep));
        RETURN __result;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.project_delete(
	__p_project_id integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
	-- Constants
	__MSG_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
	
	-- Variables
	__result JSONB;
	__msg_excep CHARACTER VARYING;
BEGIN

	DELETE FROM project_x_client 
	      WHERE _project_id = __p_project_id;
		  
	DELETE FROM project
	      WHERE project_id = __p_project_id;
	 
	__result := JSONB_BUILD_OBJECT(
		'msg' , 'Se eliminó'
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msg_excep));
        RETURN __result;
END;
$BODY$;

-- FUNCTION: public.incidence_insert(integer, character varying, character varying, timestamp without time zone, character varying, integer)

-- DROP FUNCTION public.incidence_insert(integer, character varying, character varying, timestamp without time zone, character varying, integer);

CREATE OR REPLACE FUNCTION public.incidence_insert(
	__p_project_id integer,
	__p_description character varying,
	__p_state character varying,
	__p_date_response timestamp without time zone,
	__p_solution character varying,
	__p_person_id_register integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
	-- Constants
	__MSG_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
	
	-- Variables
	__result JSONB;
	__msg_excep CHARACTER VARYING;
	__monitoring_x_project_id INTEGER;
	__date_register TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW();
	__row_count INTEGER;
BEGIN
	
	INSERT INTO monitoring_x_project (_project_id, type, description, state, person_id_register, date_register, date_response, solution)
		 VALUES (__p_project_id, 'INCID', __p_description, __p_state, __p_person_id_register, __date_register, __p_date_response, __p_solution)
	  RETURNING monitoring_x_project_id
	       INTO __monitoring_x_project_id;
		   
	GET DIAGNOSTICS __row_count = ROW_COUNT;
	IF __row_count = 0 THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'Error al regsitrar';
	END IF;
	
	__result := JSONB_BUILD_OBJECT(
		'msg' , 'Se registró',
		'id', __monitoring_x_project_id
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msg_excep));
        RETURN __result;
END;
$BODY$;


-- FUNCTION: public.incidence_update(integer, character varying, character varying, timestamp without time zone, character varying, integer, integer)

-- DROP FUNCTION public.incidence_update(integer, character varying, character varying, timestamp without time zone, character varying, integer, integer);

CREATE OR REPLACE FUNCTION public.incidence_update(
	__p_project_id integer,
	__p_description character varying,
	__p_state character varying,
	__p_date_response timestamp without time zone,
	__p_solution character varying,
	__p_person_id_register integer,
	__p_monitoring_x_project_id integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
	-- Constants
	__MSG_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
	
	-- Variables
	__result JSONB;
	__msg_excep CHARACTER VARYING;
	__row_count INTEGER;
BEGIN
	UPDATE monitoring_x_project
	   SET description          = __p_description,
	       state                = __p_state,
		   date_response        = __p_date_response,
		   solution             = __p_solution,
		   _project_id          = __p_project_id
     WHERE monitoring_x_project_id = __p_monitoring_x_project_id;
		   
	GET DIAGNOSTICS __row_count = ROW_COUNT;
	IF __row_count = 0 THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'Error al regsitrar';
	END IF;
	
	__result := JSONB_BUILD_OBJECT(
		'msg' , 'Se editó'
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msg_excep));
        RETURN __result;
END;
$BODY$;


-- FUNCTION: public.incidence_delete(integer)

-- DROP FUNCTION public.incidence_delete(integer);

CREATE OR REPLACE FUNCTION public.incidence_delete(
	__p_monitoring_x_project_id integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
	-- Constants
	__MSG_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
	
	-- Variables
	__result JSONB;
	__msg_excep CHARACTER VARYING;
BEGIN

	DELETE FROM monitoring_x_project 
	      WHERE monitoring_x_project_id = __p_monitoring_x_project_id;
	 
	__result := JSONB_BUILD_OBJECT(
		'msg' , 'Se eliminó'
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msg_excep));
        RETURN __result;
END;
$BODY$;


-- FUNCTION: public.advance_insert(integer, character varying, integer)

-- DROP FUNCTION public.advance_insert(integer, character varying, integer);

CREATE OR REPLACE FUNCTION public.advance_insert(
	__p_project_id integer,
	__p_description character varying,
	__p_person_id_register integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
	-- Constants
	__MSG_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
	
	-- Variables
	__result JSONB;
	__msg_excep CHARACTER VARYING;
	__monitoring_x_project_id INTEGER;
	__date_register TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW();
	__row_count INTEGER;
BEGIN
	
	
	INSERT INTO monitoring_x_project (_project_id, type, description, state, person_id_register, date_register)
		 VALUES (__p_project_id, 'AVANC', __p_description, 'REGIS', __p_person_id_register, __date_register)
	  RETURNING monitoring_x_project_id
	       INTO __monitoring_x_project_id;
		   
	GET DIAGNOSTICS __row_count = ROW_COUNT;
	IF __row_count = 0 THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'Error al regsitrar';
	END IF;
	
	__result := JSONB_BUILD_OBJECT(
		'msg' , 'Se registró',
		'id', __monitoring_x_project_id
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msg_excep));
        RETURN __result;
END;
$BODY$;


-- FUNCTION: public.user_insert(character varying, character varying, integer, character varying, character varying, character varying, boolean)

-- DROP FUNCTION public.user_insert(character varying, character varying, integer, character varying, character varying, character varying, boolean);

CREATE OR REPLACE FUNCTION public.user_insert(
	__p_name character varying,
	__p_last_name character varying,
	__p_role_id integer,
	__p_user character varying,
	__p_password character varying,
	__p_description character varying,
	__p_active boolean)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
	-- Constants
	__MSG_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
	
	-- Variables
	__result JSONB;
	__msg_excep CHARACTER VARYING;
	__row_count INTEGER;
	__person_id INTEGER;
BEGIN
	

	INSERT INTO person (name, last_name, active, "user", "password", description)
	     VALUES (__p_name, __p_last_name, __p_active, __p_user, __p_password, __p_description)
	  RETURNING person_id
	       INTO __person_id;
		   
	GET DIAGNOSTICS __row_count = ROW_COUNT;
	IF __row_count = 0 THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'Error al regsitrar';
	END IF;
	
	INSERT INTO role_x_person (_role_id, _person_id)
	     VALUES (__p_role_id, __person_id);
		 
	GET DIAGNOSTICS __row_count = ROW_COUNT;
	IF __row_count = 0 THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'Error al regsitrar';
	END IF;
	        
	
	__result := JSONB_BUILD_OBJECT(
		'msg' , 'Se registró',
		'id', __person_id
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msg_excep));
        RETURN __result;
END;
$BODY$;


-- FUNCTION: public.user_update(character varying, character varying, integer, character varying, character varying, character varying, boolean, integer)

-- DROP FUNCTION public.user_update(character varying, character varying, integer, character varying, character varying, character varying, boolean, integer);

CREATE OR REPLACE FUNCTION public.user_update(
	__p_name character varying,
	__p_last_name character varying,
	__p_role_id integer,
	__p_user character varying,
	__p_password character varying,
	__p_description character varying,
	__p_active boolean,
	__p_person_id integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
	-- Constants
	__MSG_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
	
	-- Variables
	__result JSONB;
	__msg_excep CHARACTER VARYING;
	__row_count INTEGER;
BEGIN
	

	UPDATE person
	   SET name        = __p_name, 
	       last_name   = __p_last_name,
		   active      = __p_active,
		   "user"      = __p_user,
		   "password"  = __p_password,
		   description =__p_description
	 WHERE person_id = __p_person_id;
		   
	GET DIAGNOSTICS __row_count = ROW_COUNT;
	IF __row_count = 0 THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'Error al actualizar';
	END IF;
	
	UPDATE role_x_person
	   SET _role_id = __p_role_id
	 WHERE _person_id = __p_person_id;
		 
	GET DIAGNOSTICS __row_count = ROW_COUNT;
	IF __row_count = 0 THEN
		RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'Error al actualizar';
	END IF;
	        
	
	__result := JSONB_BUILD_OBJECT(
		'msg' , 'Se editó'
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msg_excep));
        RETURN __result;
END;
$BODY$;


-- FUNCTION: public.user_delete(integer)

-- DROP FUNCTION public.user_delete(integer);

CREATE OR REPLACE FUNCTION public.user_delete(
	__p_person_id integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
	-- Constants
	__MSG_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
	
	-- Variables
	__result JSONB;
	__msg_excep CHARACTER VARYING;
BEGIN

	DELETE FROM role_x_person 
	      WHERE _person_id = __p_person_id;
	
	DELETE FROM person
	      WHERE person_id = __p_person_id;
	 
	__result := JSONB_BUILD_OBJECT(
		'msg' , 'Se eliminó'
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msg_excep));
        RETURN __result;
END;
$BODY$;

-- FUNCTION: public.login(character varying, character varying)

-- DROP FUNCTION public.login(character varying, character varying);

CREATE OR REPLACE FUNCTION public.login(
	__p_user character varying,
	__p_password character varying)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$

DECLARE
	-- Constants
	__MSG_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
	
	-- Variables
	__result JSONB;
	__msg_excep CHARACTER VARYING;
	__person_id integer;
BEGIN

	SELECT person_id
	  INTO __person_id
	  FROM person
     WHERE LOWER("user") = LOWER(__p_user)
	   AND "password" = __p_password
	   AND active = TRUE;
	   
	  IF __person_id IS NULL THEN
             RAISE EXCEPTION USING ERRCODE = 'ERROR', MESSAGE = 'Usuario y/o contraseña incorrectos';
         END IF;
	 
	__result := JSONB_BUILD_OBJECT(
		'person_id', __person_id
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msg_excep));
        RETURN __result;
END;
$BODY$;
