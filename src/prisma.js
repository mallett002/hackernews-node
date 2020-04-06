const {prisma} = require('./generated/prisma-client');

async function main() {
    // Create new link
    const newLink = await prisma.createLink({
        url: 'www.prisma.io',
        description: 'Prisma replaces traditional ORMs'
    });

    console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`);

    // Read all links from the database and log them
    const allLinks = await prisma.links();
    console.log({allLinks});
}

main().catch(e => console.error(e));