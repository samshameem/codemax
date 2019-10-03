<?php
// try {
require_once 'autoload.php';
// echo 'main';
// $uriSegments = explode("/", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$uriSegments = '';
if ($_SERVER['REQUEST_URI'] !== $_SERVER['PHP_SELF']) {
	$url = str_replace($_SERVER['PHP_SELF'].'/', '', $_SERVER['REQUEST_URI']);
	$uriSegments = explode("/", $url);
}
// print_r($_SERVER['REQUEST_URI']);
$class = ucfirst($uriSegments[2]);

$method = isset($uriSegments[3])?$uriSegments[3]:FALSE;
$params = array_slice($uriSegments, 4);
// print_r($params);
/*print_r($uriSegments);
echo '<br>';
print_r($_SERVER['SCRIPT_NAME']);
echo '<br>';
print_r($_SERVER['PHP_SELF']);*/
        $class = 'API\\'.$class;

        $CI = new $class();
        $parameters = array();
        // first of all, pull the GET vars
        if (isset($_SERVER['QUERY_STRING'])) {
            parse_str($_SERVER['QUERY_STRING'], $parameters);
        }

        // print_r($parameters);
        // call_user_func_array(array(&$CI, $method), $parameters);
        if ($method) {
        	call_user_func_array(array(&$CI, $method), $params);
        }
/*} catch (Exception $e) {
	print_r($e);
} catch (api\Exceptions\apiSDKException $e) {
	print_r($e);
}*/