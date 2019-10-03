<?php
namespace API;

use API\ConnectDb;
use API\API;
use API\Exceptions\apiSDKException;
// use PDO;

class Model extends API
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
		$sql = 'SELECT * FROM model WHERE id = :id';
		$array = array(':id' => $id);

		$stmt = $this->db->select($sql, $array);

		if($stmt){
			$items = $stmt;
		}
		else{
			$items = 'No car model with this id.';
		}

		echo $this->processAPI($items);

	}

	public function getAll() {

		$sql = 'SELECT * FROM model';

		$stmt = $this->db->selectAll($sql);

		if($stmt){
			$items = $stmt;
		}
		else{
			$items = false;
		}

		echo $this->processAPI($items);
	}


	public function getInventory() {

		$sql = 'SELECT *, count(model.model_name) as list FROM model JOIN manufacturer ON `model`.`manufacturer_id` = `manufacturer`.`id` WHERE model.sold = 0
		GROUP BY `model`.`model_name`';

		$stmt = $this->db->selectAll($sql);

		if($stmt){
			$items = $stmt;
		}
		else{
			$items = false;
		}

		echo $this->processAPI($items);
	}

	public function getInven($model = '') {

		$sql = 'SELECT model.*, manufacturer.name FROM model JOIN manufacturer ON `model`.`manufacturer_id` = `manufacturer`.`id` WHERE model.sold = 0 AND model_name LIKE :id';
		$array = array(':id' => $model);

		$stmt = $this->db->selectAll($sql, $array);

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

		$data['pic_1'] = $this->save_image($_FILES['pic_1']);
		$data['pic_2'] = $this->save_image($_FILES['pic_2']);


		$stmt = $this->db->insert('model',
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
	public function sold($key)
	{
		// $data = $_POST;
		$data = array('sold' => 1);

		$where = array('id' => $key);

		$stmt = $this->db->update('model',
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

	public function update($key)
	{
		if(!$_POST){
			throw new apiSDKException('Data array is empty.');
		}
		if(!$key)
			throw new apiSDKException("Error Processing Request", 405);

		$data = $_POST;

		$where = array('id' => $key);

		$stmt = $this->db->update('model',
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
		$stmt = $this->db->delete('model',
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

	private function save_image($image){

		if(is_uploaded_file($image["tmp_name"])){
			$pic_extension = pathinfo($image["name"], PATHINFO_EXTENSION);
			$tempFile = $image["tmp_name"];
			$fileName = basename($image["name"], ".".$pic_extension);
			$picDir = dirname(__FILE__) ."/../../assets/uploads/";
			$fileTime =date("Ymdhis");
			$pic_name = $fileName.'-'.$fileTime.".".$pic_extension;
			if(move_uploaded_file($tempFile, $picDir . basename($pic_name))){
				return 'assets/uploads/' . basename($pic_name);
			} else {
				return false;
			}
		}

		return false;
	}
}