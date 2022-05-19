use rand::prelude::*;
use std::collections::HashSet;
use std::io::{BufReader, BufRead};
use std::fs::File;
fn main() {


    let letters = generate_letters();
    dbg!(&letters);
    let words = get_words(letters);
    dbg!(words);
}

fn generate_letters() -> HashSet<char> {
    let mut sel_letters = HashSet::new();
    let mut rng = rand::thread_rng();
    while sel_letters.len() < 7 {
        char::from_u32(rng.gen_range(0..26) + 97).map(|letter|{
            sel_letters.insert(letter);
        });

    }
    sel_letters
}

fn get_words(sel_letters: HashSet<char>)-> std::io::Result<Vec<String>> {
    //let file = include_bytes!("./words.txt");
    let mut match_words = Vec::new();
    let file = File::open("./words.txt")?;
    let reader = BufReader::new(file);

    for line in reader.lines() {
        let tmp_line = line?;
        if tmp_line.len() > 3 && tmp_line.trim().chars().map(|c| sel_letters.contains(&c)).all(|b|b) {
            match_words.push(tmp_line);
        }
    }
    Ok(match_words)
    
}