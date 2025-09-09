import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function VerificationDashboard() {
  const [activeTab, setActiveTab] = useState("single");
  const [email, setEmail] = useState("name@company.com");
  const [emailList, setEmailList] = useState("name@company.com contact@domain.io invalid@bad marketing@brand.com");

  return (
    <div className="flex-1 bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Emailable Verify</h1>
        <Button variant="outline" className="bg-secondary text-secondary-foreground border-border">
          Check Status
        </Button>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-fit grid-cols-2 bg-secondary">
            <TabsTrigger 
              value="single" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Single Email Verification
            </TabsTrigger>
            <TabsTrigger 
              value="bulk"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Bulk Email Verification
            </TabsTrigger>
          </TabsList>

          {/* Single Email Verification */}
          <TabsContent value="single" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Single Email Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email Address</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-input border-border text-foreground"
                    placeholder="name@company.com"
                  />
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary-muted">
                  Verify
                </Button>
              </CardContent>
            </Card>

            {/* Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Score & Deliverability */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Score & Deliverability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-success">95</div>
                      <div className="text-muted-foreground">/</div>
                      <div className="text-3xl font-bold text-muted-foreground">100</div>
                      <Badge className="bg-success text-success-foreground ml-auto">Deliverable</Badge>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Reason</div>
                      <div className="text-foreground">Mailbox exists and accepts mail</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* General Info */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">General Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="text-foreground">Jane Doe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gender</span>
                    <span className="text-foreground">Female</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">State</span>
                    <span className="text-foreground">California</span>
                  </div>
                </CardContent>
              </Card>

              {/* Domain Info */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Domain Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Domain</span>
                    <span className="text-foreground">example.com</span>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm mb-1">MX Records</div>
                    <div className="text-foreground text-sm">
                      aspmx.l.google.com;<br/>
                      alt1.aspmx.l.google.com
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Attributes */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Email Attributes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Free</span>
                    <span className="text-foreground">No</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role</span>
                    <span className="text-foreground">No</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Disposable</span>
                    <span className="text-foreground">No</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Catch-all</span>
                    <span className="text-foreground">No</span>
                  </div>
                </CardContent>
              </Card>

              {/* Character Analysis */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Character Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Format</span>
                    <span className="text-foreground">Valid</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Length</span>
                    <span className="text-foreground">17</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Special Characters</span>
                    <span className="text-foreground">None</span>
                  </div>
                </CardContent>
              </Card>

              {/* Mail Server Details */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Mail Server Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Server Response</span>
                    <span className="text-foreground">250 2.1.5 OK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latency</span>
                    <span className="text-foreground">142ms</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bulk Email Verification */}
          <TabsContent value="bulk" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Bulk Email Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-muted-foreground">Email List</label>
                    <span className="text-xs text-muted-foreground">One per line or upload CSV</span>
                  </div>
                  <Textarea
                    value={emailList}
                    onChange={(e) => setEmailList(e.target.value)}
                    className="bg-input border-border text-foreground min-h-[120px]"
                    placeholder="name@company.com"
                  />
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="bg-secondary text-secondary-foreground border-border">
                    Upload CSV
                  </Button>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary-muted">
                    Start Verification
                  </Button>
                  <Button variant="outline" className="bg-secondary text-secondary-foreground border-border">
                    Export CSV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Total Emails</div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Processed</div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Deliverable</div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Invalid</div>
                </CardContent>
              </Card>
            </div>

            {/* Progress */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={0} className="w-full" />
              </CardContent>
            </Card>

            {/* Results Table */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground border-b border-border pb-2">
                    <div>Email</div>
                    <div>Status</div>
                    <div>Score</div>
                  </div>
                  <div className="text-center py-8 text-muted-foreground">
                    No results yet
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