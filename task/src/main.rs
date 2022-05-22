use rand::prelude::*;
use serde::Serialize;
use std::collections::HashSet;
use std::io::{BufReader, BufRead};
use std::fs::File;
fn main()-> Result<(), std::io::Error> {
    loop {
        let (req,sel) = generate_letters();
        dbg!(req, &sel);
        let words = get_words(req, &sel)?;
        if words.len() < 20{continue;}
        dbg!(&words);
        store_words(req, sel, words)?;
        break;
    } 
    Ok(())
}

fn generate_letters() -> (char, HashSet<char>) {
    let mut sel_letters = HashSet::new();
    let mut rng = rand::thread_rng();
    while sel_letters.len() < 7 {
        char::from_u32(rng.gen_range(0..26) + 97).map(|letter|{
            sel_letters.insert(letter);
        });

    }
    let mut tmp = sel_letters.into_iter();

    (tmp.next().unwrap(), tmp.collect())
}

fn get_words(req:char, sel_letters: &HashSet<char>)-> std::io::Result<Vec<String>> {
    //let file = include_bytes!("./words.txt");
    let mut match_words = Vec::new();
    let file = File::open("./words.txt")?;
    let reader = BufReader::new(file);

    for line in reader.lines() {
        let tmp_line = line?;

        if tmp_line.len() <= 3 {continue;}
        let mut req_char = false;
        let mut valid_word = true;
        for c in tmp_line.chars() {
            if req == c {
                req_char = true;
            } 
            else if !sel_letters.contains(&c) {
                valid_word = false;
                break;
            }
        }
        if valid_word && req_char {
            match_words.push(tmp_line);
        }
        
    }
    Ok(match_words)
}
#[derive(Serialize)]
struct FileFormat {
    req:String,
    sel:Vec<String>,
    words:Vec<String>
}
fn store_words(req:char, sel:HashSet<char>, match_words:Vec<String>)-> std::io::Result<()>{
    let file = File::create("./match_words.json")?;
    let result = FileFormat{
        req:req.to_string(),
        sel:Vec::from_iter(sel.iter().map(ToString::to_string)),
        words:match_words
    };
    serde_json::to_writer(&file, &result)?;
    Ok(())
}