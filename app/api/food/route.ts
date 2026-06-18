import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('search');

  // Jika ketikan kurang dari 2 huruf, jangan lakukan pencarian
  if (!query || query.length < 2) return NextResponse.json([]);

  try {
    // 1. Tentukan lokasi file CSV Anda
    const filePath = path.join(process.cwd(), 'data', 'makanan.csv');
    
    // 2. Baca isi file CSV tersebut
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // 3. Ubah CSV menjadi format Array Object JavaScript menggunakan PapaParse
    const parsed = Papa.parse(fileContents, {
      header: true, // Membaca baris pertama (id, calories, dll) sebagai nama kunci
      skipEmptyLines: true,
    });

    const database = parsed.data as any[];

    // 4. Cari makanan yang sesuai dengan ketikan user (berdasarkan kolom "name")
    const results = database
      .filter((food) => 
        food.name && food.name.toLowerCase().includes(query.toLowerCase())
      )
      .map((food) => ({
        name: food.name, // Mengambil kolom F (name) dari CSV Anda
        cal: parseFloat(food.calories) || 0 // Mengambil kolom B (calories) dari CSV Anda
      }));

    // 5. Kembalikan maksimal 15 hasil teratas agar dropdown rapi
    return NextResponse.json(results.slice(0, 15));
    
  } catch (error) {
    console.error("Gagal membaca database CSV lokal:", error);
    return NextResponse.json([]);
  }
}