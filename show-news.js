// Show the actual news items returned by the API
async function showNews() {
  try {
    console.log('Fetching news from API...');
    const response = await fetch('http://localhost:5000/api/news');
    
    if (response.ok) {
      const newsItems = await response.json();
      console.log(`Found ${newsItems.length} news items:`);
      
      newsItems.forEach((item, index) => {
        console.log(`\n--- News Item ${index + 1} ---`);
        console.log(`ID: ${item._id}`);
        console.log(`Title: ${item.title}`);
        console.log(`Excerpt: ${item.excerpt}`);
        console.log(`Category: ${item.category}`);
        console.log(`Published: ${item.published}`);
        console.log(`Author: ${item.author}`);
        console.log(`Created: ${item.createdAt}`);
      });
    } else {
      console.log('Error:', response.status, await response.text());
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

showNews();