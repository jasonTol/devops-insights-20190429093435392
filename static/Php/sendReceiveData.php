
<?php

$database = "BLUDB";        # Get these database details from
$hostname = "dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net";  # the web console
$user     = "ljr29093";   #
$password = "r4m^f5gl6kntq4b7";   #
$port     = 50000;          #
$ssl_port = 50001;          #

# Build the connection string
#
$driver  = "DRIVER={IBM DB2 ODBC DRIVER};";
$dsn     = "DATABASE=$database; " .
           "HOSTNAME=$hostname;" .
           "PORT=$port; " .
           "PROTOCOL=TCPIP; " .
           "UID=$user;" .
           "PWD=$password;";
$ssl_dsn = "DATABASE=$database; " .
           "HOSTNAME=$hostname;" .
           "PORT=$ssl_port; " .
           "PROTOCOL=TCPIP; " .
           "UID=$user;" .
           "PWD=$password;" .
           "SECURITY=SSL;";
$conn_string = $driver . $dsn;     # Non-SSL
$conn_string = $driver . $ssl_dsn; # SSL

# Connect
#
$conn = odbc_connect( $conn_string, "", "" );
if( $conn )
{
    echo "Connection succeeded.";
    
    

    # Disconnect
    #
    odbc_close( $conn );
}
else
{
    echo "Connection failed.";
}

//retrieve GET variable
$city = $_GET['city'];

echo $city;
//echo back that variable in json format?

?>



/*
{
  "hostname": "dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net",
  "password": "r4m^f5gl6kntq4b7",
  "https_url": "https://dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net",
  "port": 50000,
  "ssldsn": "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=ljr29093;PWD=r4m^f5gl6kntq4b7;Security=SSL;",
  "host": "dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net",
  "jdbcurl": "jdbc:db2://dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net:50000/BLUDB",
  "uri": "db2://ljr29093:r4m%5Ef5gl6kntq4b7@dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net:50000/BLUDB",
  "db": "BLUDB",
  "dsn": "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=ljr29093;PWD=r4m^f5gl6kntq4b7;",
  "username": "ljr29093",
  "ssljdbcurl": "jdbc:db2://dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net:50001/BLUDB:sslConnection=true;"
}
*/