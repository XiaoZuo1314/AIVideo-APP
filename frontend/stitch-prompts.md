# SaveAny Mobile App — Google Stitch Design Prompts

> Style Reference: Apple Human Interface Guidelines (iOS 17+)
> Brand Color: #1777FF (Electric Blue)
> Design Language: Clean, spacious, premium feel with subtle depth

---

## Global Design System (Apply to ALL screens)

Before generating any screen, apply these global rules:

- **Font**: SF Pro (system font). Use SF Pro Display for large titles (34pt bold), SF Pro Text for body (17pt regular). Never use Inter, Roboto, or Arial.
- **Color Palette**: 60% white (#FFFFFF), 30% dark text (#1F1F1F), 10% accent blue (#1777FF). Secondary text: #6B7280. Muted text: #9CA3AF. Borders: #E5E7EB. Section background: #F8FAFC.
- **Spacing**: 8-point grid. Screen margins: 20px. Card padding: 24px. Element gaps: 8, 12, 16, 24, 32px.
- **Cards**: Rounded corners (16px radius), soft drop shadows (0 4px 12px rgba(0,0,0,0.06)), 1px border #E5E7EB.
- **Buttons**: Pill-shaped (full rounded), 48px height for primary actions, 44px minimum tap targets.
- **Tab Bar**: iOS-style bottom tab bar with 4 tabs, 24px icons, SF Pro 10pt labels.
- **Status Bar**: Light style (dark text on white background).
- **Safe Area**: Respect top notch and bottom home indicator.

---

## Screen 1: Home Screen (Hero + URL Input)

**Prompt for Google Stitch:**

```
Design a mobile app home screen for a video downloader app called "SaveAny", following Apple iOS design conventions. The screen has:

TOP SECTION:
- A translucent frosted-glass navigation bar (white at 80% opacity with backdrop blur) containing: a gradient blue logo icon (play button in circle) on the left, the text "SaveAny" in semibold 18pt, and a user avatar circle (gradient blue-to-indigo, showing first letter of email) on the right.

HERO AREA (center of screen, generous vertical padding 80px top):
- A small pill-shaped status badge: white background, subtle shadow, contains a pulsing green dot and text "1800+ platforms supported" in 14pt gray.
- Large bold title (34pt, weight 700): "Download Any Video" on one line, then "with AI Power" in accent blue (#1777FF) on the next line. Left-aligned.
- Subtitle text below: "Paste a video link to download, extract subtitles, or get an AI summary" in 17pt gray (#6B7280), max-width 600px.

SEARCH INPUT BAR (full-width, 20px horizontal margin):
- A large rounded-full input field (56px height) with a chain-link icon on the left (gray), placeholder text "Paste video URL here..." in muted gray.
- White background, 1px border, subtle shadow. On focus: blue ring with 30% opacity.
- A blue pill button attached to the right side (desktop) or floating inside the input (mobile): white search icon + "Parse" text.

EXAMPLE CHIPS (below input, horizontally centered):
- 3 small rounded-full chips in a row: "YouTube", "Bilibili", "Twitter/X" — each with white background, light border, 13px text. Tappable.

BACKGROUND:
- Subtle gradient from very light blue (#E8F1FF at 50% opacity) fading to white.
- Two large decorative blurred circles (very faint blue, 5% opacity) positioned at top-right and bottom-left for depth.

BOTTOM: iOS tab bar with 4 tabs: Home (house icon, active/blue), Features (star icon), Pricing (tag icon), About (info circle icon).
```

---

## Screen 2: Video Result Screen (After Parsing)

**Prompt for Google Stitch:**

```
Design a mobile app screen showing parsed video information for a video downloader app. iOS design style. The screen layout:

NAVIGATION BAR:
- Back arrow on left, title "Video Info" centered, translucent frosted glass background.

VIDEO CARD (full-width card, 16px margin, rounded-2xl corners):
- Thumbnail: 16:9 aspect ratio image with rounded corners (12px), a dark semi-transparent duration badge ("3:42") in the bottom-right corner.
- Below thumbnail (24px padding):
  - Video title: 18pt semibold, dark text (#1F1F1F), max 2 lines with ellipsis.
  - Metadata row: platform badge (light blue background #E8F1FF, blue text "YouTube", rounded-full), eye icon + "1.2M views", calendar icon + "2024-01-15". All in 14pt gray.
  - Description: 14pt muted gray, max 2 lines.

FORMAT SELECTION SECTION (inside same card, separated by light divider):
- Section label: 14pt semibold "Select Format" with a small gear icon.
- Vertical list of format options, each as a selectable row:
  - Each row: 8px rounded icon box (blue when selected, gray when not), format label "1080p MP4" in 14pt medium, detail "120MB · H.264" in 12pt muted.
  - Selected state: blue border (#1777FF), light blue background (#E8F1FF), subtle blue ring.
  - Unselected state: light gray border, white background.
  - 3-4 format options visible (1080p, 720p, 480p, Audio Only).

ACTION BUTTONS (below card, full-width with 20px margin):
- Primary button: full-width, 48px height, pill-shaped, solid blue (#1777FF) background, white download icon + "Download Video" text, subtle shadow.
- Secondary button: full-width, 48px height, pill-shaped, blue outline (2px border), blue text "AI Summary", lightbulb icon. Tap transitions to blue fill.

BOTTOM: iOS tab bar.
```

---

## Screen 3: AI Summary Screen (4 Tabs)

**Prompt for Google Stitch:**

```
Design a full-screen mobile app page for AI-powered video analysis with a 4-tab interface. iOS design style, clean and spacious.

NAVIGATION BAR:
- Back arrow, title "AI Summary", translucent glass background.

TAB BAR (below nav, horizontal):
- 4 tabs: "Summary" (document icon), "Subtitles" (text icon), "Mind Map" (branch icon), "Q&A" (chat icon).
- Active tab: blue text (#1777FF), icon in blue, with a 2px blue underline indicator.
- Inactive tabs: gray text (#6B7280), gray icons.
- Tab bar has a light bottom border.

TAB 1 - SUMMARY VIEW (default active):
- Loading state: a centered blue spinner with "Analyzing video..." text below.
- Content state: rich markdown-rendered content with:
  - Section headings (20pt bold), subheadings (17pt semibold).
  - Body text (15pt, dark gray #374151, 1.6 line height).
  - Bullet lists with blue dots.
  - A small streaming indicator at the bottom: pulsing blue dot + "AI is thinking..." in 12pt muted text.
- Quota info bar at top: light blue background (#EFF6FF), blue border, "3 summaries remaining today" text with "Upgrade to VIP" link in blue.

TAB 2 - SUBTITLES VIEW:
- A scrollable list of timestamped subtitle segments.
- Each segment: timestamp in blue monospace ("00:15"), subtitle text in 15pt dark gray.
- Alternating light gray/white row backgrounds for readability.
- Bottom action bar: 3 pill-shaped export buttons in a row — "SRT", "VTT", "TXT" — each with download icon, light border, tappable.

TAB 3 - MIND MAP VIEW:
- A WebView container showing an interactive SVG mind map with branching nodes.
- Blue-colored nodes with connecting lines. Root node larger and bold.
- Bottom toolbar: "Fullscreen" button and "Export PNG" / "Export SVG" buttons.

TAB 4 - Q&A CHAT VIEW:
- Chat interface with message bubbles.
- User messages: right-aligned, blue background (#1777FF), white text, rounded-2xl with rounded-tr-sm tail.
- AI messages: left-aligned, light gray background (#F8FAFC), dark text, rounded-2xl with rounded-tl-sm tail. AI avatar (small blue circle with sparkle icon) on the left.
- Streaming AI response: text appears word by word with a blinking cursor.
- Bottom input bar: rounded text input + blue send button (arrow-up icon), fixed to bottom.

BOTTOM: iOS tab bar (same as other screens).
```

---

## Screen 4: Login / Register Bottom Sheet

**Prompt for Google Stitch:**

```
Design a mobile app bottom sheet modal for login and registration. iOS style, slides up from bottom.

BACKDROP:
- Semi-transparent black overlay (40% opacity) with subtle backdrop blur behind the sheet.

BOTTOM SHEET:
- White background, rounded top corners (24px radius), handles indicator bar at top (small gray pill, 40px wide, 4px tall, centered).
- The sheet covers approximately 60% of the screen height.

CONTENT (24px padding):
- Title: "Welcome Back" (login mode) or "Create Account" (register mode), 24pt bold, centered.
- Subtitle: "Sign in to access VIP features" in 15pt gray, centered, 8px below title.

FORM FIELDS (16px gap between fields):
- Email field: label "Email" in 14pt medium above, input with rounded-xl corners (12px), 48px height, email keyboard type, placeholder "your@email.com".
- Password field: label "Password" in 14pt medium above, input with eye icon toggle on right for show/hide, placeholder "Enter password".
- Error state (when applicable): red-tinted box with rounded-xl corners, red border, error text in 14pt red.

SUBMIT BUTTON:
- Full-width, 48px height, pill-shaped, solid blue (#1777FF), white text "Sign In" or "Create Account" in 16pt semibold.
- Loading state: blue spinner replaces text, button slightly transparent.
- Disabled state: 60% opacity.

TOGGLE LINK:
- Below button, centered: "Don't have an account? Sign up" — "Sign up" in blue, rest in gray. 14pt.

CLOSE BUTTON:
- X icon in top-right corner of the sheet, 44px tap target.
```

---

## Screen 5: Pricing Screen

**Prompt for Google Stitch:**

```
Design a mobile app pricing screen comparing free and VIP plans. iOS design style, clean and persuasive.

NAVIGATION BAR:
- Back arrow, title "Pricing", translucent glass background.

HEADER (24px padding, centered):
- Title: "Choose Your Plan" in 28pt bold.
- Subtitle: "Unlock unlimited AI-powered video analysis" in 15pt gray.

PRICING CARDS (stacked vertically, 16px gap, 20px horizontal margin):

FREE PLAN CARD:
- White background, rounded-2xl (16px), 1px border (#E5E7EB), 24px padding.
- Plan name: "Free" in 18pt semibold.
- Description: "Get started with basic features" in 14pt gray.
- Price: "¥0" in 36pt bold + "/month" in 14pt muted.
- Feature list (each with green checkmark icon, 14pt gray text):
  - "3 AI summaries per day"
  - "Video download in all formats"
  - "Subtitle extraction"
  - "Basic support"
- CTA button: full-width, 44px, pill-shaped, light gray border, dark text "Current Plan".

VIP PLAN CARD (featured, visually elevated):
- Gradient background from #1777FF to #2563EB (blue gradient), rounded-2xl, 24px padding, white text.
- "Recommended" badge: small white pill (20% opacity background) in top-right corner, 12pt text.
- Decorative: large faint white circle (5% opacity) positioned at top-right, partially clipped.
- Plan name: "VIP" in 18pt semibold, white.
- Description: "Unlimited access to all features" in 14pt, white at 70% opacity.
- Price: "¥9.9" in 36pt bold white + "/month" in 14pt white/70% + small discount tag "Save 50%".
- Feature list (each with yellow checkmark icon, white/90% text):
  - "Unlimited AI summaries"
  - "Priority download speed"
  - "Mind map export (PNG/SVG)"
  - "AI Q&A chat"
  - "No daily limits"
- CTA button: full-width, 44px, pill-shaped, solid white background, blue text "Upgrade to VIP" in 16pt semibold, subtle shadow.

BOTTOM: iOS tab bar.
```

---

## Screen 6: Profile / Account Screen

**Prompt for Google Stitch:**

```
Design a mobile app profile/account screen. iOS Settings-style layout, clean and minimal.

NAVIGATION BAR:
- Back arrow, title "Account", translucent glass background.

USER HEADER (white card, 24px padding):
- Large avatar: 72px circle, gradient blue (#1777FF to #2563EB), centered white initial letter in 28pt bold.
- User email: 18pt semibold, centered, dark text.
- VIP badge (if VIP): small gradient pill (yellow-to-orange), white text "VIP Member" in 12pt, with star icon. Below email.
- If not VIP: "Free Plan" text in gray with "Upgrade" link in blue.

STATS ROW (3 columns, evenly spaced, below user header):
- Each stat: large number (24pt bold) + label (12pt gray).
- "12" + "Downloads", "5" + "AI Summaries", "3" + "Days Active".

SETTINGS LIST (iOS grouped table style):
- Section 1: "Account"
  - Row: person icon, "Profile", chevron right. 16pt text.
  - Row: lock icon, "Change Password", chevron right.
- Section 2: "Subscription"
  - Row: star icon, "Manage VIP", chevron right. If VIP, show expiry date in gray.
  - Row: receipt icon, "Order History", chevron right.
- Section 3: "Support"
  - Row: questionmark.circle icon, "Help Center", chevron right.
  - Row: envelope icon, "Contact Us", chevron right.
- Each row: 48px height, light separator between rows, 16px left padding for icons.

LOGOUT BUTTON (bottom, full-width with 20px margin):
- Pill-shaped, red outline (2px border #EF4444), red text "Log Out", 16pt medium.

BOTTOM: iOS tab bar.
```

---

## Screen 7: Features Showcase Screen

**Prompt for Google Stitch:**

```
Design a mobile app features showcase screen. iOS style, visually engaging with cards.

NAVIGATION BAR:
- Back arrow, title "Features", translucent glass background.

HEADER (centered, 32px top padding):
- Title: "Why SaveAny?" in 28pt bold.
- Subtitle: "Everything you need for video content" in 15pt gray.

FEATURE CARDS (vertical list, 16px gap, 20px horizontal margin):

Each feature card:
- White background, rounded-2xl (16px), 1px border, 20px padding.
- Left: colored icon container (48px circle, 5% opacity tinted background matching the feature color).
- Right: title in 16pt semibold + description in 14pt gray, 2 lines max.

5 cards:
1. Icon: globe (blue #1777FF circle bg). Title: "1800+ Platforms". Description: "YouTube, Bilibili, TikTok, Twitter, Instagram, and many more."
2. Icon: zap (amber #F59E0B circle bg). Title: "Lightning Fast". Description: "Parse and download videos in seconds with optimized servers."
3. Icon: smartphone (green #10B981 circle bg). Title: "Mobile Friendly". Description: "Download directly to your phone. Save or share with one tap."
4. Icon: layers (purple #8B5CF6 circle bg). Title: "Multiple Formats". Description: "Choose from various resolutions and formats including MP4, MP3."
5. Icon: sparkles (blue #1777FF circle bg). Title: "AI-Powered". Description: "Get instant summaries, subtitles, mind maps, and Q&A for any video."

BOTTOM: iOS tab bar.
```

---

## Screen 8: How To Use Screen

**Prompt for Google Stitch:**

```
Design a mobile app "How to Use" tutorial screen with 3 steps. iOS style, clean with numbered steps.

NAVIGATION BAR:
- Back arrow, title "How to Use", translucent glass background.

HEADER (centered, 32px top padding):
- Title: "Get Started in 3 Steps" in 28pt bold.
- Subtitle: "From link to download in under a minute" in 15pt gray.

STEPS (vertical layout, 48px gap between steps, 20px horizontal margin):

Step 1:
- Large number "1" in 48pt bold blue (#1777FF), positioned as a decorative element.
- Card to the right (or below on narrow screens): white, rounded-2xl, 20px padding.
- Icon: clipboard with link (blue).
- Title: "Copy the Video Link" in 17pt semibold.
- Description: "Find a video on YouTube, Bilibili, TikTok, or any supported platform and copy its URL." in 14pt gray.

Step 2:
- Large number "2" in 48pt bold blue.
- Card: same style.
- Icon: magnifying glass (blue).
- Title: "Paste & Parse" in 17pt semibold.
- Description: "Open SaveAny, paste the link in the search bar, and tap Parse. We'll detect the video instantly." in 14pt gray.

Step 3:
- Large number "3" in 48pt bold blue.
- Card: same style.
- Icon: download with arrow (blue).
- Title: "Download or Analyze" in 17pt semibold.
- Description: "Choose your format and download, or use AI to get summaries, subtitles, and mind maps." in 14pt gray.

CTA BUTTON (bottom, full-width with 20px margin):
- "Try It Now" — full-width, 48px, pill-shaped, solid blue, white text, 16pt semibold.
- Navigates back to home screen.

BOTTOM: iOS tab bar.
```

---

## Design Consistency Checklist

When generating any screen, verify:

- [ ] Font sizes follow the scale: 12, 13, 14, 15, 16, 17, 18, 20, 24, 28, 34pt
- [ ] Font weights: Regular (400) for body, Medium (500) for labels/buttons, Semibold (600) for headings, Bold (700) for titles
- [ ] All interactive elements are minimum 44x44pt
- [ ] Card border radius: 16px (rounded-2xl)
- [ ] Button border radius: full (pill-shaped)
- [ ] Input border radius: 12px (rounded-xl)
- [ ] Shadows are soft and tinted (no harsh black shadows)
- [ ] Primary blue (#1777FF) is used sparingly — only for CTAs, active states, and accent elements
- [ ] Text hierarchy: headings #1F1F1F, body #374151, secondary #6B7280, muted #9CA3AF
- [ ] 8-point grid spacing (8, 12, 16, 20, 24, 32, 48, 64, 80)
- [ ] Safe area respected (top notch, bottom indicator)
- [ ] Tab bar consistent across all screens
- [ ] No emojis in UI — use SF Symbols / clean line icons only
