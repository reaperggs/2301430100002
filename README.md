Successfully implemented logging middleware.

Authentication token generation works through the provided auth endpoint.

Logging requests are sent to:
http://4.224.186.213/evaluation-service/logs

The logging endpoint currently returns:
"invalid authorization token"
despite successful token generation.