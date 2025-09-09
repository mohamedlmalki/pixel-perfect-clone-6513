import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "@/components/loading-spinner";
import { FileUpload } from "@/components/file-upload";
import { StatusBadge } from "@/components/status-badge";
import { CheckCircle, Mail, Server, User, Globe, Shield, Clock, Download, Upload as UploadIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function VerificationDashboard() {
  const [activeTab, setActiveTab] = useState("single");
  const [email, setEmail] = useState("name@company.com");
  const [emailList, setEmailList] = useState("name@company.com contact@domain.io invalid@bad marketing@brand.com");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState<any>(null);
  const [bulkProgress, setBulkProgress] = useState(0);
  const [bulkStats, setBulkStats] = useState({
    total: 0,
    processed: 0,
    deliverable: 0,
    invalid: 0
  });

  // Simulate verification process
  const handleSingleVerification = async () => {
    setIsVerifying(true);
    setVerificationResults(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setVerificationResults({
      score: 95,
      status: "deliverable",
      reason: "Mailbox exists and accepts mail",
      generalInfo: {
        name: "Jane Doe",
        gender: "Female",
        state: "California"
      },
      domainInfo: {
        domain: "example.com",
        mxRecords: ["aspmx.l.google.com", "alt1.aspmx.l.google.com"]
      },
      emailAttributes: {
        free: "No",
        role: "No",
        disposable: "No",
        catchAll: "No"
      },
      characterAnalysis: {
        format: "Valid",
        length: 17,
        specialCharacters: "None"
      },
      serverDetails: {
        response: "250 2.1.5 OK",
        latency: "142ms"
      }
    });
    
    setIsVerifying(false);
  };

  // Simulate bulk verification
  const handleBulkVerification = async () => {
    const emails = emailList.split(/[\n\s,]+/).filter(email => email.trim());
    setBulkStats(prev => ({ ...prev, total: emails.length }));
    setBulkProgress(0);
    
    for (let i = 0; i < emails.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const progress = ((i + 1) / emails.length) * 100;
      setBulkProgress(progress);
      setBulkStats(prev => ({
        ...prev,
        processed: i + 1,
        deliverable: prev.deliverable + (Math.random() > 0.3 ? 1 : 0),
        invalid: prev.invalid + (Math.random() > 0.7 ? 1 : 0)
      }));
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setEmailList(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex-1 bg-background p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Emailable Verify</h1>
          <p className="text-muted-foreground">Professional email verification service</p>
        </div>
        <Button 
          variant="outline" 
          className="bg-secondary text-secondary-foreground border-border hover:bg-secondary/80 hover:scale-105 transition-all duration-200"
        >
          <Clock className="w-4 h-4 mr-2" />
          Check Status
        </Button>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-fit grid-cols-2 bg-secondary/50 backdrop-blur-sm">
            <TabsTrigger 
              value="single" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:scale-105"
            >
              <Mail className="w-4 h-4 mr-2" />
              Single Email Verification
            </TabsTrigger>
            <TabsTrigger 
              value="bulk"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:scale-105"
            >
              <UploadIcon className="w-4 h-4 mr-2" />
              Bulk Email Verification
            </TabsTrigger>
          </TabsList>

          {/* Single Email Verification */}
          <TabsContent value="single" className="space-y-8 animate-fade-in">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:shadow-primary/20">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Single Email Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-input/50 border-border text-foreground focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="name@company.com"
                  />
                </div>
                <Button 
                  onClick={handleSingleVerification}
                  disabled={isVerifying}
                  className="bg-primary text-primary-foreground hover:bg-primary-muted hover:scale-105 transition-all duration-200 relative overflow-hidden"
                >
                  {isVerifying ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Verifying...
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-loading"></div>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify Email
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Results Grid */}
            {isVerifying && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-24 mb-4" />
                      <Skeleton className="h-8 w-16 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {verificationResults && !isVerifying && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-scale-in">
                {/* Score & Deliverability */}
                <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20 hover:shadow-lg hover:shadow-success/20 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      Score & Deliverability
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="text-4xl font-bold text-success animate-bounce-in">{verificationResults.score}</div>
                        <div className="text-2xl font-bold text-muted-foreground">/100</div>
                        <StatusBadge status="deliverable" className="ml-auto" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Reason</div>
                        <div className="text-foreground font-medium">{verificationResults.reason}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* General Info */}
                <Card className="bg-card/50 border-border/50 hover:shadow-lg transition-all duration-300 hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <User className="w-5 h-5" />
                      General Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(verificationResults.generalInfo).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center group">
                        <span className="text-muted-foreground capitalize">{key}</span>
                        <span className="text-foreground font-medium group-hover:text-primary transition-colors">{value as string}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Domain Info */}
                <Card className="bg-card/50 border-border/50 hover:shadow-lg transition-all duration-300 hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Domain Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Domain</span>
                      <span className="text-foreground font-medium">{verificationResults.domainInfo.domain}</span>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-sm mb-2">MX Records</div>
                      <div className="text-foreground text-sm space-y-1">
                        {verificationResults.domainInfo.mxRecords.map((record: string, i: number) => (
                          <div key={i} className="font-mono text-xs bg-muted/30 p-2 rounded">{record}</div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email Attributes */}
                <Card className="bg-card/50 border-border/50 hover:shadow-lg transition-all duration-300 hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Email Attributes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(verificationResults.emailAttributes).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center group">
                        <span className="text-muted-foreground capitalize">{key}</span>
                        <Badge variant={value === "No" ? "secondary" : "destructive"} className="transition-all group-hover:scale-105">
                          {value as string}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Character Analysis */}
                <Card className="bg-card/50 border-border/50 hover:shadow-lg transition-all duration-300 hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-foreground">Character Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(verificationResults.characterAnalysis).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-foreground font-medium">{value as string}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Server Details */}
                <Card className="bg-card/50 border-border/50 hover:shadow-lg transition-all duration-300 hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <Server className="w-5 h-5" />
                      Mail Server Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Server Response</span>
                      <span className="text-foreground font-mono text-sm bg-success/20 px-2 py-1 rounded">
                        {verificationResults.serverDetails.response}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Latency</span>
                      <span className="text-foreground font-medium">{verificationResults.serverDetails.latency}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Bulk Email Verification */}
          <TabsContent value="bulk" className="space-y-8 animate-fade-in">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:shadow-primary/20">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <UploadIcon className="w-5 h-5" />
                  Bulk Email Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-muted-foreground">Email List</label>
                      <span className="text-xs text-muted-foreground">One per line or upload CSV</span>
                    </div>
                    <Textarea
                      value={emailList}
                      onChange={(e) => setEmailList(e.target.value)}
                      className="bg-input/50 border-border text-foreground min-h-[120px] focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      placeholder="name@company.com&#10;contact@domain.io&#10;marketing@brand.com"
                    />
                  </div>
                  
                  <FileUpload
                    onFileSelect={handleFileUpload}
                    className="h-full"
                  />
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="outline" 
                    className="bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary hover:scale-105 transition-all duration-200"
                  >
                    <UploadIcon className="w-4 h-4 mr-2" />
                    Upload CSV
                  </Button>
                  <Button 
                    onClick={handleBulkVerification}
                    className="bg-primary text-primary-foreground hover:bg-primary-muted hover:scale-105 transition-all duration-200"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Start Verification
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary hover:scale-105 transition-all duration-200"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Emails", value: bulkStats.total, color: "text-foreground" },
                { label: "Processed", value: bulkStats.processed, color: "text-primary" },
                { label: "Deliverable", value: bulkStats.deliverable, color: "text-success" },
                { label: "Invalid", value: bulkStats.invalid, color: "text-destructive" }
              ].map((stat, i) => (
                <Card key={i} className="bg-card/50 border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/10">
                  <CardContent className="p-6 text-center">
                    <div className={cn("text-3xl font-bold mb-2 transition-all duration-300", stat.color)}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced Progress */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center justify-between">
                  <span>Progress</span>
                  <span className="text-sm font-normal text-muted-foreground">{bulkProgress.toFixed(1)}%</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={bulkProgress} 
                  className="w-full h-3 bg-secondary"
                />
                {bulkProgress > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Processing emails... {bulkStats.processed} of {bulkStats.total} completed
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Results Table */}
            <Card className="bg-card/50 border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 border-b border-border/50">
                  <h3 className="text-lg font-semibold text-foreground">Verification Results</h3>
                </div>
                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    <div className="grid grid-cols-3 gap-4 p-4 text-sm font-medium text-muted-foreground border-b border-border/30 bg-muted/20">
                      <div>Email</div>
                      <div>Status</div>
                      <div>Score</div>
                    </div>
                    {bulkStats.processed === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No results yet</p>
                        <p className="text-sm">Start verification to see results</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-border/30">
                        {emailList.split(/[\n\s,]+/).slice(0, bulkStats.processed).map((email, i) => (
                          <div key={i} className="grid grid-cols-3 gap-4 p-4 text-sm hover:bg-muted/30 transition-colors animate-fade-in" style={{animationDelay: `${i * 100}ms`}}>
                            <div className="font-mono text-foreground">{email.trim()}</div>
                            <div>
                              <StatusBadge status={Math.random() > 0.3 ? "deliverable" : "invalid"} />
                            </div>
                            <div className="font-medium text-foreground">{Math.floor(Math.random() * 40) + 60}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}