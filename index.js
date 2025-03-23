const express = require('express');
const axios = require('axios'); // Untuk mengirim HTTP request ke API Telegram
const app = express();

// Generate port acak antara 3000 dan 9999
const port = Math.floor(Math.random() * (9999 - 3000 + 1)) + 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Endpoint dengan query parameter
app.get('/api', async (req, res) => {
  // Ambil nilai dari query parameter
  const name = req.query.name;
  const firstname = req.query.firstname;
  const kelas = req.query.class; // 'class' adalah keyword di JavaScript, jadi gunakan 'kelas'
  const reason = req.query.reason;

  // Jika 'name' tidak ada, kirim pesan error
  if (!name || !firstname || !kelas || !reason) {
    return res.status(400).json({ error: 'Harap isi semua parameter: name, firstname, class, dan reason!' });
  }

  // Format pesan untuk Telegram
  const telegramMessage = `Ada orang yang izin:
Nama Panggilan: ${name}
Nama Lengkap: ${firstname}
Kelas: ${kelas}
Alasan: ${reason}`;

  // Kirim pesan ke Telegram (diam-diam, tanpa menangani error atau memberikan status)
  const botToken = '7140266074:AAEJ7Ny9MGdjGo78rv8dq1yx3yagHqMFafU'; // Ganti dengan token bot Anda
  const chatId = '-1002195377516'; // Ganti dengan chat_id Anda
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  // Kirim request ke API Telegram (tanpa await, biarkan berjalan di background)
  axios.post(telegramApiUrl, {
    chat_id: chatId,
    text: telegramMessage,
  });

  // Kirim respons JSON ke client
  res.json({
    nama_panggilan: name,
    nama_lengkap: firstname,
    kelas: kelas,
    alasan: reason,
    respon: `Ok, semoga sehat sehat ${name}`,
  });
});