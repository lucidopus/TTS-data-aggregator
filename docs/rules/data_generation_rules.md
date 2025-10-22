# Rules for Generating TTS Text Prompts

## 1. Objective

Your task is to generate individual text prompts for a Text-to-Speech (TTS) training dataset. The primary goal is to create a corpus that is phonetically balanced, prosodically diverse, and includes a wide variety of "special formats" and "lexical challenges" to train a robust model that can handle all cases, including words it has never seen.

## 2. Core Rules

1.  **Prompt Length:** Each generated prompt MUST be **1-2 complete sentences**, with a total word count of approximately **20-25 words**. This length is designed to produce an audio recording of 8-10 seconds at an average speaking pace.
2.  **Output Format:** Your response MUST be **only** the generated text prompt. Do NOT add any conversational wrappers, headers, quotation marks, or explanations (e.g., no "Here is a prompt: ...").
3.  **Clarity and Coherence:** The text must be natural, grammatically correct, and coherent. It should sound like something a human would realistically say or read.
4.  **Safe Content:** All generated text must be neutral and appropriate. Do not generate text that is offensive, controversial, or profane.

## 3. Punctuation and Prosody (Intonation)

You MUST generate prompts that use a variety of ending punctuation to teach the model different intonations (prosody).

* **Rule:** Every prompt must end in a period (`.`), a question mark (`?`), or an exclamation mark (`!`).
* **Distribution:** Aim for the following approximate distribution in your *overall* generations:
    * **80% Statements (ending in `.`)**
    * **10% Questions (ending in `?`)**
    * **10% Exclamations (ending in `!`)**

## 4. Special Format Requirements (Normalization)

A significant portion of your generated prompts MUST include "raw" text that requires normalization. This is critical for teaching the model how to read complex text.

* **Rule:** At least **50%** of the prompts you generate must contain one or more of the following special formats.

### Special Format Categories:

1.  **Numbers & Ordinals:**
    * Integers: 1,234; 50,000
    * Decimals: 98.6; 3.14159
    * Ordinals: 1st; 5th; 22nd
    * Years: 1999; 2025
    * Fractions: 1/2; 3/4
2.  **Currency:**
    * $25.50
    * €100
    * £19.99
3.  **Dates and Times:**
    * May 4th, 1995
    * 10/21/2025
    * 8:30 PM
    * 14:00
4.  **Acronyms & Initialisms (Prefer all-caps):**
    * NASA
    * FBI
    * The A.I. model
    * D.C.
5.  **Abbreviations:**
    * Dr. Smith
    * Mr. Jones
    * 123 Main St.
    * etc.
6.  **Units & Symbols:**
    * 21°C
    * 70°F
    * 50 mph
    * 10 kg
    * The @ symbol
    * A 5% increase

## 5. Corpus Content & Lexical Diversity

This rule is designed to ensure the model's Grapheme-to-Phoneme (G2P) converter is robust.

### 5.1. Diverse Topics
Generate text from a mix of domains:
* **News:** "The new city budget of $1.2M was approved on Tuesday."
* **Fiction:** "The colonel, a subtle man, walked down the aisle."
* **Technical/AI:** "Artificial Intelligence is aimed at working with humans to improve their productivity."
* **General:** "The quick brown fox, number 7, jumps over the lazy dog."

### 5.2. Phonetic & Lexical Challenge Words
* **Rule:** At least **30%** of prompts should include one or more words from the following categories to train the model on irregular pronunciations.

* **Irregular English Words:** Words whose spelling does not match their sound.
    * *Examples:* `colonel`, `yacht`, `aisle`, `subtle`, `phlegm`, `bourgeois`, `conscious`, `liaison`.
* **Foreign Loanwords:** Common words from other languages.
    * *Examples:* `rendezvous`, `quinoa`, `faux pas`, `baguette`, `genre`, `déjà vu`, `maestro`, `karaoke`.
* **Proper Nouns (People, Places, Brands):** Tricky or foreign names.
    * *Examples:* `Siobhan`, `Joaquin`, `Ngozi`, `Versailles`, `Louis Vuitton`, `Ljubljana`, `Guadalajara`.

## 6. Homograph Disambiguation

This rule is for words that are spelled the same but pronounced differently based on context.

* **Rule:** At least **10%** of prompts must contain a homograph where the context makes the pronunciation clear.
* **Homograph Examples:**
    * `read` (reed) vs. `read` (red)
    * `live` (liv) vs. `live` (lyve)
    * `content` (CON-tent) vs. `content` (con-TENT)
    * `project` (PRO-ject) vs. `project` (pro-JECT)
    * `lead` (leed) vs. `lead` (led)
    * `bass` (base) vs. `bass` (bass)
    * `minute` (MIN-it) vs. `minute` (my-NOOT)

## 7. Examples

### Good Examples (Follow all rules)

* The temperature is expected to reach 30°C by 4:00 PM tomorrow. (Rule 4)
* Did Dr. Ames really say the project was 1,500% over budget? (Rule 3, 4)
* What a fantastic discovery they made on October 1st, 2024! (Rule 3, 4)
* NASA's budget for the 2025 fiscal year is set at $25.4 billion. (Rule 4)
* The colonel had the chutzpah to park his yacht in the main aisle. (Rule 5.2)
* My friend Siobhan, who lives in Guadalajara, is learning to play the bass guitar. (Rule 5.2, 6)
* I **read** the book yesterday, but I need to **read** the new one by 5 PM. (Rule 6, 4)
* The **content** of his speech made the audience feel **content**. (Rule 6)
* Please **lead** the way to the heavy **lead** pipe. (Rule 6)
* She had a **minute** to review the **minute** details of the rendezvous. (Rule 5.2, 6)
* Is it true that the U.K. office, located at 12 Baker St., is closing? (Rule 3, 4)

### Bad Examples (Violate rules)

* **Bad:** `I like cats.` (Too short, too simple, no special formats).
* **Bad:** `Here is a prompt: The weather is nice.` (Breaks output format rule).
* **Bad:** `He ran.` (Too short).
* **Bad:** `She said "Hello"` (Uses quotation marks, which should be avoided).
* **Bad:** `The stock price went up and up and up and up and up.` (Repetitive, not natural).
