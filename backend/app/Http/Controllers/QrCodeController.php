<?php

namespace App\Http\Controllers;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class QrCodeController extends Controller
{
    public function generateQRCode()
    {
        $url = "http://localhost:3000/";
        $qrcode = QrCode::generate($url);
        return view('qrcode')->with('qrcode', $qrcode);
    }
}
