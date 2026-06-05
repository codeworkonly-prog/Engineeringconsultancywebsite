import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useContent } from '../../contexts/ContentContext';
import { toast } from 'sonner';
import { Eye, EyeOff, Save, Globe } from 'lucide-react';

export function PrivacyPolicySection() {
  const { privacyPolicy, savePrivacyPolicy } = useContent();

  const [content, setContent] = useState(privacyPolicy?.content ?? '');
  const [isDirty, setIsDirty] = useState(false);
  const [savingAs, setSavingAs] = useState<'draft' | 'publish' | null>(null);
  const [preview, setPreview] = useState(false);

  // Sync if context value changes externally
  useEffect(() => {
    setContent(privacyPolicy?.content ?? '');
    setIsDirty(false);
  }, [privacyPolicy]);

  const handleContentChange = (value: string) => {
    setContent(value);
    setIsDirty(true);
  };

  const handleSave = async (publish: boolean) => {
    setSavingAs(publish ? 'publish' : 'draft');
    try {
      const now = new Date().toISOString();
      await savePrivacyPolicy({
        content,
        isPublished: publish,
        createdAt: privacyPolicy?.createdAt ?? now,
        updatedAt: now,
        ...(publish
          ? { publishedAt: privacyPolicy?.publishedAt ?? now }
          : privacyPolicy?.publishedAt
          ? { publishedAt: privacyPolicy.publishedAt }
          : {}),
      });
      setIsDirty(false);
      toast.success(publish ? 'Privacy policy published' : 'Saved as draft');
    } catch (err: any) {
      toast.error(err?.message || 'Save failed');
    } finally {
      setSavingAs(null);
    }
  };

  const isPublished = privacyPolicy?.isPublished ?? false;
  const isBusy = savingAs !== null;

  return (
    <div className="space-y-6 max-w-4xl">

      {/* Toolbar */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            {/* Current status badge */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  isPublished
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isPublished ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
                {isPublished ? 'Published' : 'Draft'}
              </span>
              {isDirty && (
                <span className="text-xs text-amber-600 font-medium">Unsaved changes</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPreview((v) => !v)}
              >
                {preview ? (
                  <><EyeOff className="h-4 w-4 mr-2" />Edit</>
                ) : (
                  <><Eye className="h-4 w-4 mr-2" />Preview</>
                )}
              </Button>

              {/* Save as Draft */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!isDirty || isBusy}
                onClick={() => handleSave(false)}
              >
                <Save className="h-4 w-4 mr-2" />
                {savingAs === 'draft' ? 'Saving…' : 'Save Draft'}
              </Button>

              {/* Publish */}
              <Button
                type="button"
                size="sm"
                disabled={isBusy || (!isDirty && isPublished)}
                onClick={() => handleSave(true)}
              >
                <Globe className="h-4 w-4 mr-2" />
                {savingAs === 'publish' ? 'Publishing…' : 'Publish'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor / Preview */}
      <Card>
        <CardHeader>
          <CardTitle>{preview ? 'Preview' : 'Content'}</CardTitle>
        </CardHeader>

        <CardContent>
          {preview ? (
            <div
              className="privacy-policy-content prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400">Nothing to preview yet.</p>' }}
            />
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Paste or write HTML here. Supports headings, paragraphs, lists, and links.
              </p>
              <textarea
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                rows={28}
                placeholder={`<h2>Information We Collect</h2>\n<p>We collect information you provide directly to us...</p>`}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono leading-relaxed shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-gray-600">Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-gray-500 space-y-1 list-disc list-inside">
            <li>Write the policy as HTML — use <code className="bg-gray-100 px-1 rounded">&lt;h2&gt;</code>, <code className="bg-gray-100 px-1 rounded">&lt;p&gt;</code>, <code className="bg-gray-100 px-1 rounded">&lt;ul&gt;</code> tags.</li>
            <li><strong>Save Draft</strong> saves your changes without making them visible to visitors.</li>
            <li><strong>Publish</strong> saves and immediately makes the policy live at <code className="bg-gray-100 px-1 rounded">/privacy-policy</code>.</li>
            <li>Toggle <strong>Preview</strong> to see rendered output before publishing.</li>
          </ul>
        </CardContent>
      </Card>

      <style>{`
        .privacy-policy-content h1,
        .privacy-policy-content h2,
        .privacy-policy-content h3,
        .privacy-policy-content h4 {
          color: #111827;
          font-weight: 700;
          line-height: 1.25;
          margin: 1.75rem 0 0.75rem;
        }
        .privacy-policy-content h2 { font-size: 1.25rem; }
        .privacy-policy-content h3 { font-size: 1.1rem; }
        .privacy-policy-content p,
        .privacy-policy-content ul,
        .privacy-policy-content ol { margin: 0 0 1rem; color: #374151; line-height: 1.8; }
        .privacy-policy-content ul,
        .privacy-policy-content ol { padding-left: 1.5rem; }
        .privacy-policy-content a { color: var(--brand-600); font-weight: 600; }
      `}</style>
    </div>
  );
}

export default PrivacyPolicySection;
