CREATE DATABASE filecybershield;
USE filecybershield;

CREATE TABLE monitored_files(
id INT AUTO_INCREMENT PRIMARY KEY,
file_path VARCHAR(255),
file_hash VARCHAR(255),
last_checked DATETIME,
status VARCHAR(30)
);

CREATE TABLE security_events(
id INT AUTO_INCREMENT PRIMARY KEY,
file_path VARCHAR(255),
event_type VARCHAR(50),
severity VARCHAR(20),
timestamp DATETIME
);
