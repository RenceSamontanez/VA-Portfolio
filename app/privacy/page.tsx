import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Privacy Policy | SoloX Shorts Automation",
  description:
    "Privacy Policy for SoloX Shorts Automation, an automation application used to manage and publish short-form video content to YouTube.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-[#f5f5f7] font-sans selection:bg-[#818cf8]/30 selection:text-white border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 py-12 sm:px-12 sm:py-20 space-y-12">
        {/* Navigation Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#a1a1aa] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-md border border-white/10"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
        </div>

        {/* Header Section */}
        <header className="space-y-3 border-b border-white/10 pb-8">
          <span className="text-xs font-mono text-[#818cf8] tracking-widest uppercase font-bold block">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white uppercase">
            Privacy Policy
          </h1>
          <div className="text-sm font-mono text-[#a1a1aa] space-y-1 pt-2">
            <p className="font-semibold text-white">SoloX Shorts Automation</p>
            <p>Effective Date: September 4, 2026</p>
          </div>
          <p className="text-sm text-[#e4e4e7] leading-relaxed font-light pt-2">
            This Privacy Policy explains how SoloX Shorts Automation accesses and handles information when the owner connects their YouTube account to the application.
          </p>
        </header>

        {/* Policy Body Content */}
        <div className="space-y-10 text-sm sm:text-base font-light leading-relaxed text-[#e4e4e7]">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">
              1. Information We Access
            </h2>
            <p>
              When the owner authorizes SoloX Shorts Automation through Google OAuth, the application may receive authorization information and YouTube API data necessary to perform the requested YouTube actions.
            </p>
            <p>The application requests the following YouTube permission:</p>
            <div className="p-3 bg-[#0d0d0d] border border-white/10 rounded font-mono text-xs text-[#818cf8] overflow-x-auto">
              https://www.googleapis.com/auth/youtube.upload
            </div>
            <p>
              This permission is used to upload video content to the owner's YouTube channel through the YouTube Data API.
            </p>
            <p>
              SoloX Shorts Automation does not request access to Gmail, Google Photos, Google Contacts, Google Calendar, Google Drive, payment information, or other Google services unless those permissions are separately added in the future.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">
              2. How We Use Information
            </h2>
            <p>
              Information accessed through the YouTube API is used only for the functionality of the automation workflow. This may include:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#a1a1aa]">
              <li><span className="text-[#e4e4e7]">Authenticating and authorizing the owner's YouTube account.</span></li>
              <li><span className="text-[#e4e4e7]">Uploading short-form video content to the owner's YouTube channel.</span></li>
              <li><span className="text-[#e4e4e7]">Setting or managing video information required by the publishing workflow.</span></li>
              <li><span className="text-[#e4e4e7]">Determining whether an upload succeeded or failed.</span></li>
              <li><span className="text-[#e4e4e7]">Supporting the automation and scheduling workflow.</span></li>
            </ul>
            <p>
              Google user data is not used for advertising, profiling, selling data, or unrelated purposes.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">
              3. Google API Services
            </h2>
            <p>
              SoloX Shorts Automation's use of information received from Google APIs is intended to comply with the Google API Services User Data Policy, including applicable Limited Use requirements.
            </p>
            <p>
              Google user data is used only to provide the functionality described in this Privacy Policy.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">
              4. Data Storage and Retention
            </h2>
            <p>
              SoloX Shorts Automation may temporarily process authorization information and YouTube-related metadata required for the automation workflow. Video files may also be processed as part of the publishing workflow.
            </p>
            <p>
              OAuth credentials and access tokens are stored only as long as necessary to maintain the authorized connection and operate the requested automation. YouTube-related metadata and publishing records may be retained as necessary for scheduling, monitoring, troubleshooting, and maintaining the automation system.
            </p>
            <p>
              When information is no longer necessary for these purposes, it may be deleted or removed from the automation system.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">
              5. Data Sharing
            </h2>
            <p>
              SoloX Shorts Automation does not sell, rent, or trade Google user data. Google user data is not shared with advertisers, data brokers, or unrelated third parties.
            </p>
            <p>
              Information may be transmitted to service providers used to operate the automation infrastructure only when necessary to provide the requested functionality.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">
              6. Security
            </h2>
            <p>
              Reasonable technical and organizational measures are used to protect authorization information and application data. However, no method of electronic transmission or storage can be guaranteed to be completely secure.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">
              7. User Control and Revoking Access
            </h2>
            <p>
              The YouTube account owner can revoke the application's access to their Google account at any time through their Google Account security settings.
            </p>
            <p>
              Google account permissions can be managed here:{" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#818cf8] hover:underline font-mono text-xs break-all"
              >
                https://myaccount.google.com/permissions
              </a>
            </p>
            <p>
              Revoking access prevents the application from continuing to use the previously granted Google authorization.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">
              8. Children's Privacy
            </h2>
            <p>
              SoloX Shorts Automation is not directed toward children and is not intended for users under the age of 13.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              This Privacy Policy may be updated when the application's functionality or data practices change. Any updated version will be made available on this Privacy Policy page.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3 border-t border-white/10 pt-8">
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">
              10. Contact
            </h2>
            <p>
              If you have questions about this Privacy Policy or the application's handling of information, contact:
            </p>
            <a
              href="mailto:soloxclip@gmail.com"
              className="inline-block text-[#818cf8] font-mono text-sm hover:underline"
            >
              soloxclip@gmail.com
            </a>
          </section>
        </div>

        {/* Bottom Back Button */}
        <div className="border-t border-white/10 pt-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#a1a1aa] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-md border border-white/10"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </main>
  );
}