<?php
namespace api;

use api\ConnectDb;
use api\API;
use api\Exceptions\apiSDKException;
// use PDO;

class Manufacturer extends API
{

	private $db;

	public function __construct()
	{
		$this->method = $_SERVER['REQUEST_METHOD'];
		parent::__construct($this->method);
		$this->db = new ConnectDb();
	}

	/**
	 * @param string $sql  sql statement.
	 *
	 * @param array $array array to bind in the sql statment.
	 */
	public function get($id = FALSE) {
		$sql = 'SELECT * FROM manufacturer WHERE id = :id';
		$array = array(':id' => $id);

		$stmt = $this->db->select($sql, $array);

		if($stmt){
			$items = $stmt;
		}
		else{
			$items = 'No manufacturer with this id.';
		}

		echo $this->processAPI($items);

	}

	public function getAll() {

		$sql = 'SELECT * FROM manufacturer';

		$stmt = $this->db->selectAll($sql);

		if($stmt){
			$items = $stmt;
		}
		else{
			$items = false;
		}

		echo $this->processAPI($items);
	}

	public function insert() {
		$data = $_POST;

		$stmt = $this->db->insert('manufacturer',
			$data);

		if($stmt){
			$lastInsertId = array('message'=> 'Added', 'id' => $stmt) + $data;
		}
		else{
			$lastInsertId = false;
		}

		echo $this->processAPI($lastInsertId);
	}

	/**
	* update method
	* @param    string $table table name
	* @param    array $data  array of columns and values
	* @param    array $where array of columns and values
	* @return   result
	*/
	public function update($key)
	{
		if(!$_POST){
			throw new apiSDKException('Data array is empty.');
		}
		if(!$key)
			throw new apiSDKException("Error Processing Request", 405);

		$data = $_POST;

		$where = array('id' => $key);

		$stmt = $this->db->update('manufacturer',
            $data,
            $where,
            1);

        if($stmt){
            $items = $stmt;
        }
        else{
            $items = false;
        }

		echo $this->processAPI($items);
	}

	public function delete($key)
	{

		$where = $_POST;
		$stmt = $this->db->delete('manufacturer',
            $where,
            1);

        if($stmt){
            $items = $stmt;
        }
        else{
            $items = false;
        }
		echo $this->processAPI($items);
	}
}