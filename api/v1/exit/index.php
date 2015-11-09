<?php
session_start();
if (!empty($_POST['exit'])){
        unset($_SESSION['logedIn']);
        unset($_SESSION['logedInData']);
        print 'success';
}