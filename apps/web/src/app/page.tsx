import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Lock,
  MessageSquare,
  Shield,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';

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
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary">
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Platform #1 untuk Data Analytics Indonesia
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Data Bisnis Anda,{' '}
                <span className="text-primary">Insight yang Jelas</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Hubungkan bisnis Anda dengan data analyst profesional terverifikasi.
                Dana aman di escrow, bayar hanya jika puas dengan hasil.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/register?role=client">
                  <Button size="lg" className="w-full sm:w-auto">
                    Posting Proyek Gratis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register?role=analyst">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Daftar sebagai Analyst
                  </Button>
                </Link>
              </div>
              {/* Trust indicators */}
              <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Gratis posting
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  Escrow aman
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  Respon cepat
                </div>
              </div>
            </div>

            {/* Featured Analyst Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-3xl" />
              <Card className="relative border-2 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge>Top Analyst</Badge>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-semibold">4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-xl font-bold">
                      AS
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Ahmad Santoso</h3>
                      <p className="text-sm text-muted-foreground">Senior Data Analyst</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ex-Gojek, Ex-Tokopedia
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-4 border-y">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">47</p>
                      <p className="text-xs text-muted-foreground">Proyek</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">98%</p>
                      <p className="text-xs text-muted-foreground">Sukses</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">&lt;2j</p>
                      <p className="text-xs text-muted-foreground">Respon</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">SQL</Badge>
                    <Badge variant="secondary">Tableau</Badge>
                    <Badge variant="secondary">Power BI</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/30 py-12">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground mt-1">Proyek Selesai</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground mt-1">Klien Puas</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">150+</p>
                <p className="text-sm text-muted-foreground mt-1">Analyst Aktif</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">4.8</p>
                <p className="text-sm text-muted-foreground mt-1">Rating Rata-rata</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="container py-24">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Cara Kerja</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              4 Langkah Mudah
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Dari posting proyek hingga mendapat insight, semua bisa selesai dalam hitungan hari.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                icon: FileSpreadsheet,
                title: 'Posting Proyek',
                description: 'Jelaskan kebutuhan Anda dengan template panduan. Gratis, tanpa biaya posting.',
                highlight: 'Gratis',
              },
              {
                step: '2',
                icon: Users,
                title: 'Terima Proposal',
                description: 'Analyst terverifikasi akan mengirim proposal. Bandingkan dan pilih yang terbaik.',
                highlight: 'Bandingkan',
              },
              {
                step: '3',
                icon: Wallet,
                title: 'Dana di Escrow',
                description: 'Bayar ke escrow yang aman. Dana hanya dilepas setelah Anda approve hasil.',
                highlight: 'Aman 100%',
              },
              {
                step: '4',
                icon: CheckCircle2,
                title: 'Approve & Bayar',
                description: 'Review hasil, minta revisi jika perlu. Puas? Dana otomatis ke analyst.',
                highlight: 'Garansi Revisi',
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-muted" />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="rounded-full bg-primary/10 p-4 mb-4">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                      {item.step}
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-2">{item.highlight}</Badge>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Escrow Security Section */}
        <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Keamanan Terjamin</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Dana Anda 100% Aman dengan Sistem Escrow
                </h2>
                <p className="text-muted-foreground mb-8">
                  Seperti Upwork dan Fiverr, DataPraktis menggunakan sistem escrow profesional.
                  Dana Anda tidak akan dilepas sampai Anda benar-benar puas dengan hasil kerja.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      icon: Lock,
                      title: 'Dana Terkunci Aman',
                      description: 'Pembayaran disimpan di rekening escrow terpisah',
                    },
                    {
                      icon: Clock,
                      title: '14 Hari Review',
                      description: 'Waktu cukup untuk review hasil sebelum dana dilepas',
                    },
                    {
                      icon: MessageSquare,
                      title: 'Revisi Gratis',
                      description: 'Minta perbaikan hingga 2x jika belum sesuai',
                    },
                    {
                      icon: Shield,
                      title: 'Proteksi Sengketa',
                      description: 'Tim support siap membantu jika ada masalah',
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <Card className="border-2 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold">Status Pembayaran</h3>
                      <Badge variant="success">Aman di Escrow</Badge>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                        <Check className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">Milestone 1 - Selesai</p>
                          <p className="text-sm text-green-600">Dana dilepas Rp 2.500.000</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-800">Milestone 2 - Review</p>
                          <p className="text-sm text-blue-600">12 hari tersisa untuk review</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Milestone 3 - Terkunci</p>
                          <p className="text-sm text-muted-foreground">Rp 1.500.000 di escrow</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="container py-16">
          <div className="text-center mb-12">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              Dipercaya oleh Bisnis Indonesia
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {['Startup A', 'UMKM B', 'Corp C', 'Brand D', 'Company E'].map((company, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-6 w-6" />
                <span className="font-semibold">{company}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-24 bg-muted/50">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Keunggulan</Badge>
              <h2 className="text-3xl font-bold">
                Mengapa Pilih DataPraktis?
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4 mx-auto w-fit">
                    <FileSpreadsheet className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Template Proyek</h3>
                  <p className="text-muted-foreground">
                    Pilih dari 10+ template seperti "Sales Forecasting" atau "Marketing Dashboard" —
                    langsung tahu deliverables yang akan Anda dapatkan.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4 mx-auto w-fit">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Analyst Terverifikasi</h3>
                  <p className="text-muted-foreground">
                    Semua analyst melalui proses screening ketat. Profil menampilkan
                    portfolio nyata dan track record yang bisa diverifikasi.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4 mx-auto w-fit">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Hasil Terukur</h3>
                  <p className="text-muted-foreground">
                    Milestone-based delivery dengan review berkala.
                    Anda selalu tahu progress dan bisa minta revisi kapan saja.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container py-24">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Testimoni</Badge>
            <h2 className="text-3xl font-bold">
              Apa Kata Klien Kami
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Budi Hartono',
                role: 'CEO, TokoBaru',
                quote: 'Dashboard penjualan yang dibuat sangat membantu kami melihat trend produk. ROI investasi terbayar dalam 2 bulan!',
                rating: 5,
              },
              {
                name: 'Sarah Wijaya',
                role: 'Marketing Manager, Brand X',
                quote: 'Analyst-nya responsif dan hasil kerjanya profesional. Sistem escrow bikin tenang, tidak perlu khawatir.',
                rating: 5,
              },
              {
                name: 'Rudi Setiawan',
                role: 'Owner, UMKM Sukses',
                quote: 'Pertama kali pakai jasa data analyst, prosesnya mudah banget. Template proyek sangat membantu jelaskan kebutuhan.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Siap Mengubah Data Jadi Keputusan?
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Posting proyek gratis dalam 5 menit. Dapatkan proposal dari analyst profesional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register?role=client">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Posting Proyek Gratis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10">
                    Lihat Proyek Tersedia
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">DataPraktis</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Platform marketplace data analytics terpercaya untuk bisnis Indonesia.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Untuk Klien</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/register?role=client" className="hover:text-primary">Posting Proyek</Link></li>
                <li><Link href="/analysts" className="hover:text-primary">Cari Analyst</Link></li>
                <li><Link href="#how-it-works" className="hover:text-primary">Cara Kerja</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Untuk Analyst</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/register?role=analyst" className="hover:text-primary">Daftar Analyst</Link></li>
                <li><Link href="/browse" className="hover:text-primary">Cari Proyek</Link></li>
                <li><Link href="/help" className="hover:text-primary">Panduan</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary">Tentang Kami</Link></li>
                <li><Link href="/privacy" className="hover:text-primary">Kebijakan Privasi</Link></li>
                <li><Link href="/terms" className="hover:text-primary">Syarat & Ketentuan</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 DataPraktis. Hak cipta dilindungi.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-green-600" />
                Pembayaran Aman
              </span>
              <span className="flex items-center gap-1">
                <Lock className="h-4 w-4 text-green-600" />
                Data Terenkripsi
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
