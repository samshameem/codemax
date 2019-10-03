<?php
// try {
require_once 'autoload.php';
// echo 'main';
// $uriSegments = explode("/", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$uriSegments = '';
if ($_SERVER['SCRIPT_NAME'] !== $_SERVER['PHP_SELF']) {
	$url = str_replace($_SERVER['SCRIPT_NAME'].'/', '', $_SERVER['PHP_SELF']);
	$uriSegments = explode("/", $url);
}
$class = ucfirst($uriSegments[0]);

$method = isset($uriSegments[1])?$uriSegments[1]:FALSE;
$params = array_slice($uriSegments, 2);
// print_r($params);
/*print_r($uriSegments);
echo '<br>';
print_r($_SERVER['SCRIPT_NAME']);
echo '<br>';
print_r($_SERVER['PHP_SELF']);*/
        $class = 'api\\'.$class;

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