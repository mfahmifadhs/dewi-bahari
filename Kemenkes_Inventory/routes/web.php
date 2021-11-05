<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PetugasController;
use App\Http\Controllers\SatkerController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('login');
});

Route::get('dashboard', [AuthController::class, 'dashboard']); 
Route::get('login', [AuthController::class, 'index'])->name('login');
Route::post('custom-login', [AuthController::class, 'customLogin'])->name('login.custom'); 
Route::get('registration', [AuthController::class, 'registration'])->name('register-user');
Route::post('custom-registration', [AuthController::class, 'customRegistration'])->name('register.custom'); 
Route::get('signout', [AuthController::class, 'signOut'])->name('signout');


Route::group(['middleware' => 'auth'], function () {

    // =============
    // Admin Master
    // =============
    Route::group(['middleware' => ['role:admin-master','status:aktif'], 'prefix' => 'admin-master', 'as' => 'admin-master.'], function () {

        Route::get('dashboard', [AdminController::class, 'index']);
        Route::get('show_user', [AdminController::class, 'showUser']);
        Route::get('show_warehouse', [AdminController::class, 'showWarehouse']);
        Route::get('create_user', [AdminController::class, 'createUser']);
        Route::get('create_warehouse', [AdminController::class, 'createWarehouse']);
        Route::get('create_slot/{id}', [AdminController::class, 'createSlot']);
        Route::get('create_all_order', [AdminController::class, 'createAllOrder']);
        Route::get('create_order/{id}', [AdminController::class, 'createOrder']);
        Route::get('create_exit_order', [AdminController::class, 'createExitOrder']);
        Route::get('edit_warehouse/{id}', [AdminController::class, 'editWarehouse']);
        Route::get('detail_warehouse/{id}', [AdminController::class, 'detailWarehouse']);
        Route::get('detail_slot/{id}', [AdminController::class, 'detailSlot']);
        Route::get('detail_order/{id}', [AdminController::class, 'detailOrder']);

        Route::post('add_user', [AdminController::class, 'addUser']);
        Route::post('add_warehouse', [AdminController::class, 'addWarehouse']);
        Route::post('add_slot', [AdminController::class, 'addSlot']);
        Route::post('add_order_all', [AdminController::class, 'addOrderAll']);
        Route::post('update_warehouse/{id}', [AdminController::class, 'updateWarehouse']);
        Route::post('rack_pallet/{id}', [AdminController::class, 'detailWarehouse']);
        Route::post('exit_item', [AdminController::class, 'exitItem']);

        Route::get('/get_slot_id', [AdminController::class, 'getSlotId']);
        Route::get('/get_item', [AdminController::class, 'getItem']);
        Route::get('/get_warehouse', [AdminController::class, 'getWarehouse']);
        Route::get('/get_item_category', [AdminController::class, 'getItemCategory']);
        Route::get('/get_item_code_09', [AdminController::class, 'getItemCode09']);

        // BARANG KELUAR
        Route::get('/get_warehouse_id', [AdminController::class, 'getWarehouseId']);
        Route::get('/get_pallet_id', [AdminController::class, 'getPalletId']);
        Route::get('/get_item_id', [AdminController::class, 'getItemId']);

    });

    // =============
    // Admin User
    // =============
    Route::group(['middleware' => ['role:admin-user','status:aktif'], 'prefix' => 'admin-user', 'as' => 'admin-user.'], 
        function () {
            
        Route::get('dashboard', [PetugasController::class, 'index']);
        Route::get('show_warehouse', [PetugasController::class, 'showWarehouse']);
        Route::get('create_all_order', [PetugasController::class, 'createAllOrder']);
        Route::get('create_exit_order', [PetugasController::class, 'createExitOrder']);
        Route::get('edit_warehouse/{id}', [PetugasController::class, 'editWarehouse']);
        Route::get('detail_warehouse/{id}', [PetugasController::class, 'detailWarehouse']);
        Route::get('detail_slot/{id}', [PetugasController::class, 'detailSlot']);
        Route::get('detail_order/{id}', [PetugasController::class, 'detailOrder']);

        Route::post('add_order_all', [PetugasController::class, 'addOrderAll']);
        Route::post('add_exit_order', [PetugasController::class, 'addExitOrder']);

        Route::get('/get_slot_id', [PetugasController::class, 'getSlotId']);
        Route::get('/get_item', [PetugasController::class, 'getItem']);
        Route::get('/get_warehouse', [PetugasController::class, 'getWarehouse']);
        Route::get('/get_item_category', [PetugasController::class, 'getItemCategory']);
        Route::get('/get_item_code_09', [PetugasController::class, 'getItemCode09']);

        // BARANG KELUAR
        Route::get('/get_warehouse_id', [PetugasController::class, 'getWarehouseId']);
        Route::get('/get_pallet_id', [PetugasController::class, 'getPalletId']);
        Route::get('/get_item_id', [PetugasController::class, 'getItemId']);

    });

    // =============
    // Satuan Kerja (SATKER)
    // =============
    Route::group(['middleware' => ['role:satker','status:aktif'], 'prefix' => 'satker', 'as' => 'satker.'], function () {

        Route::get('dashboard', [SatkerController::class, 'index']);
        Route::get('detail_slot/{id}', [SatkerController::class, 'detailSlot']);

    });

});
