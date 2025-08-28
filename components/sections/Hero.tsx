"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Zap, Github } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { uploadToWarmStorage, UploadResult } from "@/lib/warmweb";

export function HeroSection() {
  const [uploadStatus, setUploadStatus] = useState<UploadResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleMockUpload = async () => {
    setIsUploading(true);
    setUploadStatus(null);
    
    // Simulate file selection
    const mockFile = new File(["mock content"], "my-static-site.zip", { type: "application/zip" });
    
    try {
      const result = await uploadToWarmStorage([mockFile]);
      setUploadStatus(result);
    } catch {
      setUploadStatus({
        jobId: "error",
        status: "failed",
        error: "Upload failed. Please try again."
      });
    } finally {
      setIsUploading(false);
    }
  };

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl lg:text-6xl font-bold tracking-tight"
              >
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  WarmWeb
                </span>
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl lg:text-2xl text-muted-foreground"
              >
                Host static sites on Filecoin Warm Storage in minutes.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-muted-foreground max-w-lg"
              >
                Fast uploads, verifiable storage, easy retrieval. Powered by Filecoin Onchain Cloud.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" onClick={scrollToFeatures} className="text-lg px-8 py-6 h-auto">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Mock Upload UI */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Card className="p-8 border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Upload Static Site</h3>
                    <p className="text-muted-foreground">Drop your dist/ folder or select files</p>
                  </div>
                </div>

                {/* Mock File List */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">my-static-site.zip</span>
                    <span className="text-xs text-muted-foreground ml-auto">2.4 MB</span>
                  </div>
                </div>

                <Button 
                  onClick={handleMockUpload} 
                  disabled={isUploading}
                  className="w-full"
                  size="lg"
                >
                  {isUploading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Zap className="h-4 w-4" />
                      </motion.div>
                      Uploading to Warm Storage...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload to Warm Storage
                    </>
                  )}
                </Button>

                {/* Upload Status */}
                {uploadStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      uploadStatus.status === "complete" 
                        ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                        : uploadStatus.status === "failed"
                        ? "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                        : "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
                    }`}
                  >
                    <div className="text-sm font-medium">
                      {uploadStatus.status === "complete" && "✅ Upload Complete!"}
                      {uploadStatus.status === "failed" && "❌ Upload Failed"}
                      {uploadStatus.status === "created" && "📤 Upload Created"}
                    </div>
                    {uploadStatus.contentUrl && (
                      <div className="text-xs mt-1 opacity-80">
                        Content available at: {uploadStatus.contentUrl}
                      </div>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}