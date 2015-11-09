<?php
session_start();
if (!empty($_POST['login'])
        and !empty($_POST['passwd'])){
    // Check by database, open session, return token, e. t.
    if (md5(trim($_POST['login']) . trim($_POST['passwd'])) == 'c514c91e4ed341f263e458d44b3bb0a7') {
        // You have choose method validate auth.
        $_SESSION['logedIn'] = 'Y';
        $_SESSION['logedInData'] = base64_encode($_POST['login'] . '|' . time() . '|' . 'IP' . '|' . 'UA');
        print 'success';
    } else {
        print 'error';
    }

}