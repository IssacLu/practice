<?php 

/* ThinkPHP Proxy for TwT Mall By Zhyupe*/
$url = $_SERVER['REQUEST_URI'];

$start = strpos($url, '.php/') + 4;
$end = strpos($url, '?');

if ($end === false)
  $url = substr($url, $start);
else 
  $url = substr($url, $start, $end - $start);

$_SERVER['PATH_INFO'] = '/Home'.$url;
unset($url, $start, $end);

// 应用入口文件

// 检测PHP环境
if(version_compare(PHP_VERSION,'5.3.0','<'))  die('require PHP > 5.3.0 !');

// 开启调试模式 建议开发阶段开启 部署阶段注释或者设为false
define('APP_DEBUG',True);

// 定义应用目录
define('APP_PATH','./Application/');

// 引入ThinkPHP入口文件
require './ThinkPHP/ThinkPHP.php';

// 亲^_^ 后面不需要任何代码了 就是如此简单
