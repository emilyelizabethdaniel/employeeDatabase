const express = require('express');
const inquirer = require('inquirer');
const mysql2 = require('mysql2');

const app = express();
const PORT = 3001;
const PORT = process.env.PORT || 3001;


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));