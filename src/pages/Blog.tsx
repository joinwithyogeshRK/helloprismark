import React from 'react';
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";

export const Blog = () => {
  // Mock blog post data
  const featuredPost = {
    id: 1,
    title: "The Art of Handcrafted Pottery",
    excerpt: "Discover the ancient techniques behind our most popular ceramic collections and how we preserve traditional craftsmanship.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    date: "June 15, 2023",
    author: "Maria Crafton",
    category: "Techniques"
  };

  const blogPosts = [
    {
      id: 2,
      title: "Sustainable Materials in Modern Crafting",
      excerpt: "How we source eco-friendly materials that don't compromise on quality or aesthetics.",
      image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      date: "May 28, 2023",
      author: "Thomas Reed",
      category: "Materials"
    },
    {
      id: 3,
      title: "From Sketch to Shelf: Our Design Process",
      excerpt: "A behind-the-scenes look at how our artisans transform concepts into finished pieces.",
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      date: "April 12, 2023",
      author: "Sophia Chen",
      category: "Design"
    },
    {
      id: 4,
      title: "Seasonal Inspirations: Summer Collection Preview",
      excerpt: "Get a first look at our upcoming summer pieces inspired by coastal landscapes.",
      image: "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      date: "March 30, 2023",
      author: "James Wilson",
      category: "Collections"
    },
    {
      id: 5,
      title: "Meet the Artisans: Elena's Weaving Journey",
      excerpt: "An interview with our master weaver about her 20-year craft journey and techniques.",
      image: "https://images.unsplash.com/photo-1459501462159-97d5bded1416?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      date: "February 15, 2023",
      author: "David Lopez",
      category: "Artisan Spotlight"
    },
    {
      id: 6,
      title: "Caring for Your Craftify Pieces",
      excerpt: "Expert tips on maintaining and preserving your handcrafted items for years to come.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      date: "January 22, 2023",
      author: "Anna Johnson",
      category: "Care & Maintenance"
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Blog Hero Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-background-light">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-text">
                Craftify Blog
              </h1>
              <p className="max-w-[700px] text-lg text-text-light">
                Stories, insights, and inspiration from our community of artisans and craft enthusiasts.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="w-full py-12 bg-background-light">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-text">Featured Article</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 text-sm text-primary-600">
                  <span>{featuredPost.category}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  {featuredPost.title}
                </h3>
                <p className="text-lg text-text-light">{featuredPost.excerpt}</p>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                    {featuredPost.author.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-text">By {featuredPost.author}</span>
                </div>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary-500 text-white hover:bg-primary-600 h-10 py-2 px-4 w-fit">
                  Read Article
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="w-full py-16 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-text">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogPosts.map((post) => (
                <article 
                  key={post.id} 
                  className={cn(
                    "flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-background-light shadow-sm transition-all hover:shadow-md",
                    "min-h-[400px]"
                  )}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center space-x-2 text-sm text-primary-600 mb-2">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">{post.title}</h3>
                    <p className="text-text-light flex-1 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-sm text-text-light">{post.author}</span>
                      </div>
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-primary-500 text-primary-500 hover:bg-primary-50 h-8 py-1 px-3">
                        Read More
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-16 bg-primary-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center space-y-4 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-text">Subscribe to Our Newsletter</h2>
              <p className="text-text-light">Stay updated with our latest articles, product releases, and exclusive artisan interviews.</p>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-background-light px-3 py-2 text-sm placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-offset-2"
                />
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary-500 text-white hover:bg-primary-600 h-10 py-2 px-4">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};