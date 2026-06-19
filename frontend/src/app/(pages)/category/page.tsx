"use client";

const categories = [
  {
    name: "MINIMALISM",
    count: "2,482 WALLPAPERS",
    alt: "A clean, minimalist high-key architectural photography piece with sharp geometric shadows and vast white spaces.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgKcVq1rc6USvreXYTDJds88z2h18lgAPj012a_FR5W3z-Ci-WdS4oVdxTpPjveh8tce-VVsWTT4CO5XbWlT_NOuPY7NMjRLz9bEo3mn27_wLyrJXcNjx0YiIrysDZiw1KaUTfdxjD0rcqYyVuTOCvmowUbHB8ePGG1rTUpeuO2hrhHo0kjjBJfnxwkJQCH5Ve8QvzTDUY3tTOGJrOcO3PZ6pEeHm_XmI-c09JLkOP56EPLtrotaXDE-WC6tjoXU9S5Vm2s-lyfDA",
  },
  {
    name: "CYBERPUNK",
    count: "1,105 WALLPAPERS",
    alt: "A high-contrast cinematic shot of a rainy neon-lit alleyway in a futuristic metropolis.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7XpGeet1ghBQxGhCr4eghqIKMgtMfmmXtmxBJ2lmOimBut_fvLI84sCau8yACaprYvXZru2kLnRKv1KB2PRpISn1i7JQ0dmxtkJ1a8T3Pa2RlfXtn4IOgRgNPad-4DocQV2s3idGeo39q7evlVo4ES6LCoKK8oQq0Xly7Fp2bvQyQgcjfmQWuvJMXjtPgbE4Lkxd2skBA-usVEe209sU_EX2_LprbQOeeEdSpvl13vNrgm-0tlk4LnrPpR1ZCKxjjcOBT4x_PqRw",
  },
  {
    name: "LANDSCAPE",
    count: "4,890 WALLPAPERS",
    alt: "A breathtaking monochrome landscape of jagged mountain peaks shrouded in dense, swirling morning mist.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtItrFr607cQp-nuOkK6UEwV9dQYuZAAQ9HpOmFDPfdcdxSQ_I9Hy_6JFphrhNHgYDPn0wZQ5_rqEq4xOXb6q5MoLR6tsHw1_Du-8QDyQFHPRIfzthbfhr1QBsBgJEwHBj7rru8ertQZvEfGc6QQB0d65vvG4cvdMX-qzrywBOTtSIS-CKdWGylOqAjOuzBSK4apd_IWLQVxBA8kUmnPMfR8OOrVP57OnezzzlhDoieOaFS6VXdnNEhCjUiMfxiD1rozj86_4O8lY",
  },
  {
    name: "ARCHITECTURE",
    count: "1,542 WALLPAPERS",
    alt: "An abstract low-angle shot of a brutalist concrete building against a cloudless, high-contrast sky.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqPWGNJqT7k4rj4wpuplZYeJZg7vM3o5Ob-nRT4SCKNTpAus6yS6rIH_5HFD8nuOS13xxgOAj2IOnonafFLwR6HUl229tu6lRAuxwMm01esFaEOrtDK1VUFWVZzjH2kXk_rM2HH2r8PX0g15gKijMcOabHfUFyBmeygHn08AYC4xwJHXfDc24a1ZDj542MX3FFUSbrQ3a0gKFgC67MG5NgsHlhBiOSAQurk0692PxIsMv--he72kCSL3-VGNNgj1uXLJTBtdbkPuY",
  },
  {
    name: "ABSTRACT",
    count: "3,211 WALLPAPERS",
    alt: "A complex generative abstract artwork featuring intricate liquid ripples and sharp geometric shards intersecting.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTtNTBpywDoUydDwvTb2l3UPUIffwWb09FI7KLBfrcL3a9PaKrOXm6v6DzFjfmuoVS-B0blVNpn6B0RGqMhQ77QbRqShmHSzjGy7zPHCdmW1fHG0K-KH3Fx-Ydbpce-ObmZ9uPdZG2pPoqd7wzNCza21Ma3RfUrUe0oxsIrFuInilN_JiGhk9b07BAT80ju8NySrATzOdJszoUlE3u5WbwRQ7dOr4WwU3eUnx-nWMCEC2pnU5A9GndJu8O35X3KVVuplvV86vOFJQ",
  },
  {
    name: "ANIME",
    count: "942 WALLPAPERS",
    alt: "A detailed black and white manga-style illustration of a solitary figure standing on a rooftop overlooking a sprawling urban landscape.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEoqEv_KQWoenAxPSE0AI6ER6oQjN5wCPKxl8Y2jwIRbh_--sNcZf1U3NEVw2sfKNoekTYX3Jhlhdoan8rioH_0EdBhW0SHeOoUDDVqJdUi1cABc22qTfbn4K1_vdBuksNWLAQ1I04I4JE3xsyLGj7UncnxLPUybRktj89ZhzggJb2a0rtH7WjA0LJitInclNFMlRJ1ztqXJMvqlWnE36eGVZuj3jPjC1EwzcVnaBYirozjvJ2Z51P1vrQxGDU5mMQ5VRug4q1ezU",
  },
  {
    name: "NATURE",
    count: "1,876 WALLPAPERS",
    alt: "A macro photography shot of delicate frost crystals on a dark leaf, rendered in high-contrast black and white.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBupJrqfx3Gy5w1Mb0HwX65wvhPlGjflMj6YWromw5xnTj3D-uNYUYYSWNuZIPVANHyxLm4KS3L5N2a9B-_YxnUj6M8vbJRwINKcCdfygZGw3icSdOQzFHqrSBKdrvd-K3ajiYf0i6pfORfBFgqAJ5iLJM4JBSIGpXWS5izSLaJngZNgsitjFI2ey0ZN4LSgx6bQVmx4tFaObLl5K9dz29VmAeZXNOdaLUXau_Rzo4fhCSUT6kMoso0tvBIUQixg1U3rM3O4wUB_hU",
  },
  {
    name: "TECHNICAL",
    count: "754 WALLPAPERS",
    alt: "A close-up shot of a sophisticated circuit board with glowing traces and high-precision components.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKucCzklFciDI-l31H-vQeWR0HZw4Lcvz0g96R2kAYFcy4xu2NAsxKwMFA0JPA6iBC7KgZQ11HtRZiZ_KgQwGY3QwI9Wvo4fiAUIeD_i5CRL8k087nMFa9TlJ_JlJRo1sCtAnPdyvMTCaUPRlDXjxTiNQGPTc4s1yXUmq4y9yzFIVfg65j8ZlDYrvWsAy-nS9QRk3nBZIrWmpyWchML651yp2qZ8eTo4CPcPgtheUvmjNgDRiqRwmjgyXvAcwboXFQsbGRm5sPyMo",
  },
  {
    name: "SPACE",
    count: "1,203 WALLPAPERS",
    alt: "A deep space telescope capture of a massive nebula, rendered in stark black and white.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAK6iC9Ku2c5pnLXBglLSdMtTUbzNkX6t_LrvyV4DI8h8qBwvwRgbXo_Sk4ZBcC3uJ19fnn2_vKNNnFOFxU3dgIkkgNlHItpCZ8oKjwl5PidDG0vI3KdWE9xGQEenyKBaXeS0cs9im7WtTXw85Jnq26Hr5MFNJ_21VB1fceZGfCFkXWb7FGqOfD2aJREOTunW9zHfPbfr4x81-Kbq1d4xKj50G2HoTflLFffkRoPIVmcBJpXZ4PsMRuriA1Fmmkjbc9GN1HoyxLPoI",
  },
];

export default function CategoryPage() {
  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 w-full">
      <header className="mb-16 border-l-4 border-primary pl-6">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-2">Categories</h1>
        <p className="font-meta-data text-meta-data uppercase tracking-widest text-secondary">
          Curated visual taxonomies for digital surfaces
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {categories.map((cat) => (
          <a
            key={cat.name}
            className="category-card relative group overflow-hidden h-80 w-full bg-black flex items-center justify-center"
            href="#"
          >
            <div
              className="card-bg absolute inset-0 bg-cover bg-center grayscale brightness-75"
              style={{ backgroundImage: `url('${cat.src}')` }}
            />
            <div className="card-overlay absolute inset-0 bg-black/20 transition-colors" />
            <div className="relative z-10 text-center px-6">
              <h2 className="font-display-lg text-white mb-2 tracking-tighter">{cat.name}</h2>
              <span className="font-label-sm text-white/80 bg-black/40 px-3 py-1 backdrop-blur-sm">{cat.count}</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
