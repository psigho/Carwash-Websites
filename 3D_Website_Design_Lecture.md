# 3D Website Design - Tools and Resources

> Source: YouTube lecture (<https://www.youtube.com/watch?v=nhibi9TRgNc>)
> Processed via NotebookLM

## Core Website & 3D Builders

* **AntiGravity:** A platform used to build 3D websites and software without writing code, acting as the primary hub for integrating all other tools.
* **Spline (spline.design):** Described as the industry standard for 3D websites, this tool is used to discover, remix, and export interactive 3D assets.
* **AI Studio:** A workspace used to prompt the initial structural build of a website because it has access to a broader range of models and UI components before importing the code to AntiGravity.

## AI Models & Prompt Engineering Tools

* **Gemini 3.1 & Gemini 3 Flash:** Advanced AI models utilized within both AI Studio and AntiGravity to generate website layouts, code, and components.
* **Glido:** A free application used to refine, improve, and sharpen text prompts for image generation.
* **Nano Banana / Nano Banana Pro:** An AI image generation model recommended for creating custom graphic assets for the website.

## Design Inspiration, UI, and Graphics

* **cosmos.so, MidJourney, & Dribbble:** Platforms heavily recommended for creating mood boards, finding design inspiration, and sourcing base reference images.
* **Weevi.ai:** Described as a "secret design tool," it allows users to drop in images, fonts, and concepts to generate specific aesthetic vibes and website assets. It is noted to be a part of **Figma**.
* **Canva:** Used to automatically detect exact color palettes from reference photos and to seamlessly remove image backgrounds.
* **Fonts in Use, ideogram, & Adobe Fonts:** Websites recommended for finding typography inspiration and downloading font files.
* **21st.dev & CodePen:** Repositories used for "UI sniping," which involves finding highly trending, interactive UI components (like buttons or testimonial sliders) and copying them into your project.

## Databases, Automations, & CRMs

* **Supabase:** A database integrated directly into AntiGravity via an MCP service to store frontend data like form submissions. **Firebase** is also mentioned as an alternative.
* **Beehiiv:** An email marketing platform used to collect user emails, chosen specifically for its high deliverability.
* **Go High Level (GHL):** An automation and CRM app triggered via inbound webhooks to capture lead data and build automated welcome sequences.
* **Gravity Claw / OpenClaw:** Mentions of app systems or alternatives that can be built or utilized.

## Hosting, Version Control & Custom Integrations

* **GitHub:** Used to store repository files, which can be cloned into AntiGravity or used for pushing the final website live.
* **Vercel:** The platform used to actually host the live websites on the internet.
* **Custom Skills/MCPs:** The workflow relies on downloadable add-ons, including a **Spline Anti-Gravity skill**, a **Vercel MCP**, and an **Instant Publish skill**. Export files usually rely on **vanilla.js**.

---

## Summary of What You Can Learn from This Video

* **Integrating 3D Assets without Code:** You learn how to browse Spline's community for jaw-dropping 3D animations, remix them, and export them as `vanilla.js` code snippets. You can then use AntiGravity skills to inject these assets directly into website hero sections.
* **"Vibe Design" and Design Intelligence:** The video teaches a structured creative process. Instead of accepting basic AI outputs, you learn how to browse Dribbble and MidJourney for inspiration, use Canva to extract color palettes, utilize Weevi to blend concepts into custom assets, and meticulously instruct the AI on font choices to create a cohesive, premium brand aesthetic.
* **Optimizing the AI Build Process:** You learn why it is more effective to use AI Studio to "one-shot" the initial 80% of a website's structure (due to its expansive component library), and then clone that repository into AntiGravity where the code can be scaled and refined.
* **UI Sniping:** You will learn how to dramatically elevate a site's interactivity by browsing 21st.dev and CodePen for trending UI components (like glass-morphism effects or Snapchat-style story viewers) and integrating that specific code via AntiGravity.
* **Connecting Backend Systems via AI:** The video demonstrates how to make a beautiful site functional. You learn to instruct AntiGravity to connect a Supabase database, which catches form submissions and routes that data via webhooks to Beehiiv for newsletters and Go High Level for automated CRM sequences.
* **Instant Hosting:** Finally, you learn how to bypass manual deployment by using CLI tools and MCP configurations to auto-publish your finished code to GitHub and instantly host it live on Vercel.
