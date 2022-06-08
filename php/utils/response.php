<?php
function response($message, $status_code = null)
{
  if ($status_code !== null) {
    http_response_code($status_code);
  }
  exit(json_encode($message));
}
