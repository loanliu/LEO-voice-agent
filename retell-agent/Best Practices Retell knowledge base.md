### Summary Report: Best Practices for Retell.AI Knowledge Base Preparation

**Purpose:**  
Optimize documents for ingestion by Retell.AI’s knowledge base, ensuring effective retrieval and accurate voice agent performance.

***

#### 1. **File Formats**
- Preferred: **Markdown**, **PDF**, **DOCX**, **TXT**.
- Use Markdown or clear paragraphs for better chunking and retrieval.[1]

***

#### 2. **Content Structuring**
- Break information into clear, topic-focused sections: addresses, amenities, pricing, policies, FAQs.
- Logical Hierarchy: Sort content to reflect anticipated user queries; group related items together.
- Use headings and subheadings for hierarchy.
- Categorize and tag data for easy navigation.[2]
- Remove duplicates and ambiguous details; maintain consistent terminology.

***

#### 3. **Chunking & Embedding**
- Retell.AI uses semantic chunking (NLP) to break content into organized segments.
- Recommended chunk size: **500 tokens**.
- Overlap: **100 tokens** to maintain context between segments.
- Structure sections logically to avoid splitting sentences or key context.[2]

***

#### 4. **Mapping to Natural Language**
- Write sections as if answering user questions.
- FAQs and Q&A formats improve voice agent accuracy.
- Use natural phrasing; avoid jargon.

***

#### 5. **Updates & Testing**
- Use auto-sync or batch upload for up-to-date information.
- Leverage Retell.AI’s analytics/testing tools to validate chunking and retrieval performance.
- Test retrieval with representative queries to confirm conversational quality.[1][2]

***

### **Quick Reference Table**

| Best Practice      | Details                                      |
|--------------------|-----------------------------------------------|
| File Format        | Markdown, PDF, DOCX, TXT                      |
| Sectioning         | Headings, subheadings, topic-based grouping   |
| Chunk Size         | 500 tokens                              |
| Overlap            | 100 tokens                                 |
| Mapping            | FAQ/Q&A style, natural phrasing               |
| Update/Test        | Auto-sync, LLM testing, analytics             |

***

**Result:**  
Following these practices enables highly accurate, context-rich retrieval for Retell.AI voice agents, maximizing real-time support quality and document compatibility.
