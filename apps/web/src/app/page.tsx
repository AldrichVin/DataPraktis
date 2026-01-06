import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, FileSpreadsheet, Shield, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DataPraktis</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/browse" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Cari Proyek
            </Link>
            <Link href="/analysts" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Temukan Analyst
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Cara Kerja
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Masuk</Button>
            </Link>
            <Link href="/register">
              <Button>Daftar Gratis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Data Bisnis Anda,{' '}
              <span className="text-primary">Insight yang Jelas</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Hubungkan bisnis Anda dengan data analyst profesional. Upload Excel atau CSV,
              jelaskan kebutuhan Anda, dan dapatkan dashboard, laporan, serta rekomendasi
              yang mudah dipahami.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register?role=client">
                <Button size="lg" className="w-full sm:w-auto">
                  Posting Proyek
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register?role=analyst">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Daftar sebagai Analyst
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-24 bg-muted/50">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Mengapa DataPraktis?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <FileSpreadsheet className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Template Proyek</h3>
                <p className="text-muted-foreground">
                  Pilih template seperti "Sales Forecasting" atau "Marketing Dashboard" —
                  langsung tahu apa yang akan Anda dapatkan.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Analyst Terverifikasi</h3>
                <p className="text-muted-foreground">
                  Semua analyst sudah diseleksi ketat. Profil menampilkan hasil nyata,
                  bukan hanya sertifikasi.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pembayaran Aman</h3>
                <p className="text-muted-foreground">
                  Sistem escrow melindungi Anda. Dana hanya dilepas setelah Anda puas
                  dengan hasil kerja.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Siap Mengubah Data Jadi Keputusan?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Mulai gratis. Posting proyek pertama Anda dalam 5 menit.
            </p>
            <Link href="/register">
              <Button size="lg">
                Mulai Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="font-semibold">DataPraktis</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 DataPraktis. Hak cipta dilindungi.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
