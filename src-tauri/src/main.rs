// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod excel_functions;

use calamine::DataType;
use excel_functions::{get_rows, get_ip, get_usr_ip, get_works};


pub static mut DATA: Vec<Vec<DataType>> = Vec::new();

fn main() {
    let app = tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_rows, get_ip, get_usr_ip, get_works]);
    app.run(tauri::generate_context!())
        .expect("error while running tauri application");
}
