const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// Sample data
let publishers = [
  {
    publisher: 'publisher 1',
    domains: [
      { domain: "bla.com", desktopAds: 5, mobileAds: 3 },
      { domain: "bla1.com", desktopAds: 2, mobileAds: 30 }
    ]
  },
  {
    publisher: 'publisher 2',
    domains: [
      { domain: "walla.com", desktopAds: 0, mobileAds: 4 },
      { domain: "gar.com", desktopAds: 5, mobileAds: 3 }
    ]
  }
];


app.get('/', (req, res) => {
    res.json('Hello from my app');
  });

// Get all publishers
app.get('/publishers', (req, res) => {
  console.log("fetch all publishers")
  res.json(publishers);
});


// POST request to create a new publisher
app.post('/publishers', (req, res) => {
  console.log("create a new publisher",  req.body)
  const { publisher } = req.body;

  if (!publisher) {
    return res.status(400).json({ error: 'Publisher name is required' });
  }

  // Check if publisher already exists
  const publisherExists = publishers.some(p => p.publisher === publisher);
  if (publisherExists) {
    return res.status(400).json({ error: 'Publisher already exists' });
  }

  // Add new publisher
  const newPublisher = { publisher, domains: [] };
  publishers.push(newPublisher);
  
  res.status(201).json(newPublisher);
});



// Create a new domain
app.post('/publishers/:publisherName/domains', (req, res) => {
  console.log("create a new domain",  req.params)
  const { publisherName } = req.params;
  const newDomain = req.body;

  // Validate input
  if (!newDomain.domain || newDomain.desktopAds === undefined || newDomain.mobileAds === undefined) {
    return res.status(400).json({ message: 'Invalid domain data' });
  }

  // Find the publisher
  const publisher = publishers.find(p => p.publisher === publisherName);
  if (!publisher) {
    return res.status(404).json({ message: 'Publisher not found' });
  }

  // Check if domain already exists
  const domainExists = publisher.domains.some(d => d.domain === newDomain.domain);
  if (domainExists) {
    return res.status(409).json({ message: 'Domain already exists for this publisher' });
  }

  // Generate a new ID for the domain
  newDomain.id = publisher.domains.length ? Math.max(...publisher.domains.map(d => d.id)) + 1 : 1;
  
  // Add the new domain to the publisher
  publisher.domains.push(newDomain);
  
  res.status(201).json(newDomain);
});


// Update a specific domain for a specific publisher
app.put('/publishers/:publisherName/domains/:domainName', (req, res) => {
  console.log("update a new domain",  req.params)
  const { publisherName, domainName } = req.params;
  
  const updatedDomain = req.body;
  
  // Find the publisher
  const publisher = publishers.find(p => p.publisher === publisherName);
  

  if (!publisher) {
    return res.status(404).json({ message: 'Publisher not found' });
  }

    // Check if the new domain already exists in any other publisher
    const isDomainUnique = !publishers.some(p => 
      p.publisher !== publisherName && 
      p.domains.some(d => d.domain === updatedDomain.domain)
    );

     // Check if the domain already exists in the same publisher
  const isDomainInSamePublisher = publisher.domains.some(d => d.domain === updatedDomain.domain);

  if (isDomainInSamePublisher && domainName !== updatedDomain.domain) {
    return res.status(400).json({ message: 'Domain already exists in the same publisher' });
  }    
  
    if (!isDomainUnique) {
      return res.status(400).json({ message: 'Domain already exists in another publisher' });
    }
    
else{
  // Find the domain within the publisher
  const domainIndex = publisher.domains.findIndex(d => d.domain === domainName);

  if (domainIndex !== -1) {
    // Update the domain
    publisher.domains[domainIndex] = { ...publisher.domains[domainIndex], ...updatedDomain };
    res.json(publisher.domains[domainIndex]);
  } else {
    res.status(404).json({ message: 'Domain not found' });
  }
}
  
});

// Delete a specific domain for a specific publisher
app.delete('/publishers/:publisherName/domains/:domainName', (req, res) => {
  console.log("delete a specific domain", req.params)
  const { publisherName, domainName } = req.params;
  
  // Find the publisher
  const publisher = publishers.find(p => p.publisher === publisherName);

  if (!publisher) {
    return res.status(404).json({ message: 'Publisher not found' });
  }

  // Find the domain index within the publisher
  const domainIndex = publisher.domains.findIndex(d => d.domain === domainName);

  if (domainIndex !== -1) {
    // Remove the domain
    publisher.domains.splice(domainIndex, 1);
    res.status(200).json({ message: 'Domain deleted successfully' });
  } else {
    res.status(404).json({ message: 'Domain not found' });
  }
});


// Update a publisher's name
app.put('/publishers/:oldName', (req, res) => {
  console.log("update a publisher name");
  
  const { oldName } = req.params;
  const { publisher } = req.body; // Extract the new name correctly
  console.log("oldName, newName", req.params, req.body);
  
  // Find the publisher
  const publisherObj = publishers.find(p => p.publisher === oldName);

  if (!publisherObj) {
    return res.status(404).json({ message: 'Publisher not found' });
  }

  // Check if the new name already exists
  const nameExists = publishers.some(p => p.publisher === publisher);
  if (nameExists) {
    return res.status(400).json({ message: 'Publisher with this name already exists' });
  }

  // Update the publisher's name
  publisherObj.publisher = publisher;

  res.json(publisherObj);
});


// Delete a publisher by name
app.delete('/publishers/:name', (req, res) => {
  console.log("Deleting publisher");

  const { name } = req.params;
  
  // Find the index of the publisher to delete
  const index = publishers.findIndex(p => p.publisher === name);

  if (index === -1) {
    return res.status(404).json({ message: 'Publisher not found' });
  }

  // Remove the publisher from the list
  const [deletedPublisher] = publishers.splice(index, 1);
  console.log("Deleted publisher:", deletedPublisher);

  res.json({ message: 'Publisher and related domains deleted successfully' });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
