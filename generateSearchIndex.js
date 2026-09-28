const fs = require('fs');
const path = require('path');

const routes = [
  { path: "/", file: "src/components/framework/Home.vue", title: "Home" },
  { path: "/About", file: "src/components/framework/About.vue", title: "About Us" },
  { path: "/Services", file: "src/components/framework/Services.vue", title: "Services" },
  { path: "/OurTeam", file: "src/components/framework/OurTeam.vue", title: "Team" },
  { path: "/Systems", file: "src/components/framework/Systems.vue", title: "Systems" },
  { path: "/Actionplan", file: "src/components/framework/Actionplan.vue", title: "Publications" },
  { path: "/Events", file: "src/components/framework/Events.vue", title: "Events" },
  { path: "/Officers", file: "src/components/framework/Rti/Officers.vue", title: "RTI" },
  { path: "/Teldirec", file: "src/components/framework/Teldirec.vue", title: "Contact Us" },
  { path: "/Disclaimer", file: "src/components/framework/Disclaimer.vue", title: "Disclaimer" }
];

const searchIndex = [];

routes.forEach(route => {
  const filePath = path.join(__dirname, route.file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract template content
    const templateMatch = content.match(/<template>([\s\S]*?)<\/template>/);
    let textContent = '';
    
    if (templateMatch) {
      const templateHtml = templateMatch[1];
      
      // Strip HTML tags and script/style tags if any inside template
      textContent = templateHtml
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\{\{[^\}]+\}\}/g, ' ') // Strip Vue bindings like {{ msg }}
        .replace(/\s+/g, ' ') // Collapse spaces
        .trim();
    }
    
    searchIndex.push({
      path: route.path,
      title: route.title,
      content: textContent
    });
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});

const outputPath = path.join(__dirname, 'src/assets/search-content.json');
fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
console.log('Search index generated successfully at', outputPath);
