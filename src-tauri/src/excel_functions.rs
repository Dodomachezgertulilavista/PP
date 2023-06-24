use std::collections::{HashMap, HashSet};

use calamine::{open_workbook, Reader, Xlsx};
use chrono::NaiveDateTime;
use regex::Regex;

use crate::DATA;

/*
 УРОВЕНЬ ПОДОЗРЕНИЯ
 0 - НЕТ
 1 - ЕСТЬ ПОДОЗРЕНИЕ
 2 - ВИНОВЕН!
 */

fn match_ip(ip: &str) -> bool {
    let ip_pattern = Regex::new(r"^(\d{1,3}\.){3}\d{1,3}$").unwrap();
    ip_pattern.is_match(ip)
}

fn match_date(ip: &str) -> bool {
    let ip_pattern = Regex::new(r"^(\d{1,3}\.){3}\d{1,3}$").unwrap();
    ip_pattern.is_match(ip)
}

#[tauri::command]
pub async fn get_rows(path: &str) -> Result<(), ()> {
    unsafe { DATA.clear(); }
    let mut excel: Xlsx<_> = open_workbook(path).unwrap();
    let sheets = &excel.sheet_names().to_vec()[0];
    if let Some(Ok(r)) = excel.worksheet_range(sheets) {
        for row in r.rows().skip(1) {
            if row.len() != 9 {
                continue;
            }
            if !row[4].is_string() || !row[8].is_string() || !row[5].is_string() {
                continue;
            }
            if row[4].to_string() != "Тест" || row[8].to_string().is_empty() {
                continue;
            }
            match row[5].to_string().as_str() {
                "Попытка теста завершена и отправлена на оценку" | "Начата попытка теста" => {
                    unsafe { DATA.push(row.to_vec()) }
                }
                _ => {}
            }
        }
    }
    Ok(())
}


#[tauri::command]
pub async fn get_ip() -> Result<HashMap<String, HashSet<String>>, ()> {
    let mut res: HashMap<String, HashSet<String>> = HashMap::new();

    unsafe {
        for row in &DATA {
            let ip_entry = res.entry(row[8].to_string()).or_insert_with(HashSet::new);
            ip_entry.insert(row[1].to_string());
        }
    }

    let res: HashMap<String, HashSet<String>> = res
        .into_iter()
        .filter(|(_, ips)| ips.len() >= 2)
        .collect();

    Ok(res)
}

#[tauri::command]
pub async fn get_usr_ip() -> Result<HashMap<String, HashSet<String>>, ()> {
    let mut res: HashMap<String, HashSet<String>> = HashMap::new();

    unsafe {
        for row in &DATA {
            let ip_entry = res.entry(row[1].to_string()).or_insert_with(HashSet::new);
            ip_entry.insert(row[8].to_string());
        }
    }
    let res: HashMap<String, HashSet<String>> = res
        .into_iter()
        .filter(|(_, ips)| ips.len() >= 5)
        .collect();

    Ok(res)
}


#[tauri::command]
pub async fn get_works() -> Result<HashMap<String, HashMap<String, i32>>, ()> {
    let mut res: HashMap<String, HashMap<String, i32>> = HashMap::new();
    let mut user_map: HashMap<String, HashMap<String, Vec<i64>>> = HashMap::new();
    unsafe {
        for row in &DATA {
            user_map.entry(row[1].to_string().clone())
                .or_insert_with(HashMap::new)
                .entry(row[3].to_string().clone())
                .or_insert_with(Vec::new)
                .push(NaiveDateTime::parse_from_str(&row[0].to_string(), "%d/%m/%y, %H:%M").unwrap().timestamp());
        }
    }
    for (k, v) in user_map {
        let mut user_data: HashMap<String, i32> = HashMap::new();
        for (work_name, times) in v {
            if times.len() > 1 {
                let time = (times[0] - times[1]).abs();
                if time < 180 {
                    let status = if time < 60 { 2 } else { 1 };
                    user_data.insert(format!("{}: <{}сек.", &work_name, time + 60), status);
                }
            }
        }
        if user_data.len() > 0 {
            res.insert(k, user_data);
        }
    }
    Ok(res)
}

