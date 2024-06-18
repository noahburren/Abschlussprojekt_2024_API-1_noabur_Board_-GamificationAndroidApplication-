-- Löschen falls Datenbank existiert
DROP DATABASE IF EXISTS Uebungsdatenbank;

-- Datenbank erstellen
CREATE DATABASE Uebungsdatenbank;

-- Datenbank auswählen
USE Uebungsdatenbank;

-- Tabelle für Übungen erstellen
CREATE TABLE IF NOT EXISTS Uebungen (
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    NAME TEXT NOT NULL,
    Kategorie TEXT NOT NULL
);

-- Tabelle für die Zuordnung von Benutzern zu Übungen erstellen
CREATE TABLE IF NOT EXISTS user_exercises (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    category TEXT NOT NULL,
    exercise_id INTEGER NOT NULL,
    FOREIGN KEY (exercise_id) REFERENCES Uebungen(ID)
);


-- Beinübungen
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Leg Extensions', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Hamstring Curls', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Calf Raises', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Step-Ups', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Box Jumps', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Squats mit Langhantel', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Hack Squats', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Walking Lunges', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Bulgarian Split Squats', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Sumo Deadlifts', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Bulgarian Split Squats', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Romanian Deadlifts', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Leg Press Machine', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Calf Raises Machine', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Pistol Squats', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Leg Curls Machine', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Standing Calf Raises', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Lateral Lunges', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Box Squats', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Hack Squats Machine', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Squats', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Lunges', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Deadlifts', 'Beine');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Leg Press', 'Beine');






-- Brustübungen
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Incline Bench Press', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Decline Bench Press', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Cable Crossovers', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Dumbbell Pullovers', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Machine Chest Press', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Push-Up Variationen', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Dumbbell Squeeze Press', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Machine Flys', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Dips', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Pec Deck', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Bench Press', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Push-Ups', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Chest Flys', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Dumbbell Press', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Incline Dumbbell Press', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Chest Dips', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Incline Cable Flys', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Decline Dumbbell Press', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Machine Press', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Dumbbell Pullovers', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Dumbbell Bench Press', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Cable Press', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Svend Press', 'Brust');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Wide Grip Push-Ups', 'Brust');

-- Rückenübungen
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Good Mornings', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('T-Bar Rows', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Seated Cable Rows', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('One-Arm Dumbbell Rows', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Machine Rows', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Renegade Rows', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Superman', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Kettlebell Swings', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Pull-Up Variationen', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Back Extensions', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Pull-Ups', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Rows', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Deadlifts', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Lat Pulldowns', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Bent Over Rows', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Seated Rows', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Reverse Flys', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Back Extensions', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Hyperextensions', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Straight Arm Pulldowns', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Kettlebell Rows', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Barbell Shrugs', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Reverse Grip Bent Over Rows', 'Rücken');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Underhand Grip Pulldowns', 'Rücken');

-- Armübungen
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Barbell Curls', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Tricep Pushdowns', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Preacher Curls', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Overhead Tricep Extensions', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Dumbbell Hammer Curls', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Close Grip Bench Press', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Concentration Curls', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Skull Crushers mit Langhantel', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Reverse Curls', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Diamond Push-Ups', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Hammer Curls', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Tricep Kickbacks', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Zottman Curls', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Skull Crushers mit Kurzhantel', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('French Press', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Spider Curls', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Overhead Dumbbell Tricep Extension', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Reverse Grip Curl', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Barbell Preacher Curls', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Dips', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Bicep Curls', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Tricep Dips', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Hammer Curls', 'Arme');
INSERT INTO Uebungen (NAME, Kategorie) VALUES ('Skull Crushers', 'Arme');
