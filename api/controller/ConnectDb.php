<?php
namespace API;

use API\Exceptions\apiSDKException;
use PDO;

class ConnectDb extends PDO
{
	protected static $instance = null;
	protected $conn;
	protected $host = 'localhost';
	protected $user = 'codemax';
	protected $pass = 'codemax';
	protected $name = 'tg_codemax';
	protected $connection;

	// The db connection is established in the private constructor.
	public function __construct()
	{
		try {
			$options = array(
				PDO::ATTR_PERSISTENT    => false,
				PDO::ATTR_ERRMODE       => PDO::ERRMODE_EXCEPTION,
				PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"
			);
			$this->conn = new PDO("mysql:host={$this->host};dbname={$this->name}", $this->user,$this->pass, $options);

			if(!self::$instance)
			{
				self::$instance = $this->conn;
			}
			$this->connection = self::$instance;
			$this->conn = null;
		}
		catch (PDOException $err) {
			throw new apiSDKException("Error connecting DB.", 1);
			die();
		}
	}

	/**
	* method for selecting records from a database
	* @param  string $sql       sql query
	* @param  array  $array     named params
	* @param  object $fetchMode
	* @param  string $class     class name
	* @return array            returns an array of records
	*/
	public function select($sql, $array = array(), $fetchMode = PDO::FETCH_OBJ, $class = '')
	{
		$stmt = $this->connection->prepare($sql);
		foreach ($array as $key => $value) {
			if (is_int($value)) {
				$stmt->bindValue("$key", $value, PDO::PARAM_INT);
			} else {
				$stmt->bindValue("$key", $value);
			}
		}

		$stmt->execute();

		if ($fetchMode === PDO::FETCH_CLASS) {
			return $stmt->fetch($fetchMode, $class);
		} else {
			return $stmt->fetch($fetchMode);
		}
	}

	public function selectAll($sql, $array = array(), $fetchMode = PDO::FETCH_OBJ, $class = '')
	{
		$stmt = $this->connection->prepare($sql);
		foreach ($array as $key => $value) {
			if (is_int($value)) {
				$stmt->bindValue("$key", $value, PDO::PARAM_INT);
			} else {
				$stmt->bindValue("$key", $value);
			}
		}

		$stmt->execute();

		if ($fetchMode === PDO::FETCH_CLASS) {
			return $stmt->fetchAll($fetchMode, $class);
		} else {
			return $stmt->fetchAll($fetchMode);
		}
	}

	/**
	* insert method
	* @param  string $table table name
	* @param  array $data  array of columns and values
	*/
	public function insert($table=null, $data=array())
	{
		$table = isset($table) ? $table : false;
		if(!$table){
			throw new apiSDKException('Table name is undefined.');
		}
		$data = isset($data) ? $data : false;
		if(!$data){
			throw new apiSDKException('Data array is empty.');
		}

		ksort($data);

		$fieldNames = implode(',', array_keys($data));
		$fieldValues = ':'.implode(', :', array_keys($data));

		$stmt = $this->connection->prepare("INSERT INTO $table ($fieldNames) VALUES ($fieldValues)");

		foreach ($data as $key => $value) {
			$stmt->bindValue(":$key", $value);
		}

		$stmt->execute();
		return $this->connection->lastInsertId();
	}

	/**
	* update method
	* @param  string $table table name
	* @param  array $data  array of columns and values
	* @param  array $where array of columns and values
	*/
	public function update($table, $data, $where, $limit)
	{

		ksort($data);

		$fieldDetails = $uselimit = null;
		foreach ($data as $key => $value) {
			$fieldDetails .= "$key = :field_$key,";
		}
		$fieldDetails = rtrim($fieldDetails, ',');

		$whereDetails = null;
		$i = 0;
		foreach ($where as $key => $value) {
			if ($i == 0) {
				$whereDetails .= "$key = :where_$key";
			} else {
				$whereDetails .= " AND $key = :where_$key";
			}
			$i++;
		}
		$whereDetails = ltrim($whereDetails, ' AND ');

		//if limit is a number use a limit on the query
		if (is_numeric($limit)) {
			$uselimit = "LIMIT $limit";
		}

		$stmt = $this->connection->prepare("UPDATE $table SET $fieldDetails WHERE $whereDetails $uselimit");

		foreach ($data as $key => $value) {
			$stmt->bindValue(":field_$key", $value);
		}

		foreach ($where as $key => $value) {
			$stmt->bindValue(":where_$key", $value);
		}

		$stmt->execute();
		return $stmt->rowCount();
	}


	/**
	* Delete method
	*
	* @param  string $table table name
	* @param  array $where array of columns and values
	* @param  integer   $limit limit number of records
	*/
	public function delete($table, $where, $limit)
	{
		ksort($where);

		$whereDetails = null;
		$i = 0;
		foreach ($where as $key => $value) {
			if ($i == 0) {
				$whereDetails .= "$key = :$key";
			} else {
				$whereDetails .= " AND $key = :$key";
			}
			$i++;
		}
		$whereDetails = ltrim($whereDetails, ' AND ');

		//if limit is a number use a limit on the query
		if (is_numeric($limit)) {
			$uselimit = "LIMIT $limit";
		}

		$stmt = $this->connection->prepare("DELETE FROM $table WHERE $whereDetails $uselimit");

		foreach ($where as $key => $value) {
			$stmt->bindValue(":$key", $value);
		}

		$stmt->execute();
		return $stmt->rowCount();
	}

	public function raw($sql, $option)
	{

		$stmt = $this->connection->prepare($sql);
		$stmt->execute();
		if ($option === 'fetch')
			return $stmt->fetch(PDO::FETCH_OBJ);

		if ($option === 'fetchAll')
			return $stmt->fetchAll(PDO::FETCH_OBJ);

		if ($option === 'insert')
			return $this->connection->lastInsertId();

		if ($option === 'update' || $option === 'delete')
			return $stmt->rowCount();
	}

}