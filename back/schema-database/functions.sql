CREATE OR REPLACE FUNCTION public.client_insert(
	__p_name character varying,
	__p_ruc character varying,
	__p_address character varying,
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
BEGIN
	
	__result := JSONB_BUILD_OBJECT(
		'msj'        , 'Se registró'
	);
	RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'ERROR' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msg' , SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msg_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msg' , __MSG_ERROR, 'msg_error', CONCAT(SQLERRM,' - ', __msj_excep));
        RETURN __result;
END;
$BODY$;