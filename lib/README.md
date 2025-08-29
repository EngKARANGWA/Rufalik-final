# API Client Documentation

This directory contains the API client for the Rugalika News backend. The API client provides a centralized way to call all backend endpoints with proper TypeScript support, error handling, and authentication management.

## Files

- `api-client.ts` - Main API client with all endpoint functions
- `api-examples.ts` - Practical examples of how to use the API client
- `config.ts` - API configuration (base URL, etc.)

## Quick Start

### Basic Usage

```typescript
import { auth, news, users } from '@/lib/api-client'

// Authentication
const loginResponse = await auth.sendCode('admin@example.com')
const verifyResponse = await auth.verifyCode('admin@example.com', '123456')

// Get news
const newsResponse = await news.getAll({ page: 1, limit: 10 })

// Get users
const usersResponse = await users.getAll({ role: 'admin' })
```

### Authentication

The API client automatically handles authentication tokens. When you successfully log in, the token is stored and automatically included in subsequent requests.

```typescript
import { auth } from '@/lib/api-client'

// Send login code
const sendCodeResponse = await auth.sendCode('karangwacyrille@gmail.com')

// Verify code and get token
const verifyResponse = await auth.verifyCode('karangwacyrille@gmail.com', '123456')

// Get current user
const currentUser = await auth.getCurrentUser()

// Logout
await auth.logout()
```

## Available Modules

### Authentication (`auth`)
- `sendCode(email)` - Send OTP to email
- `verifyCode(email, code)` - Verify OTP and get token
- `getCurrentUser()` - Get current user profile
- `logout()` - Logout and clear token

### News (`news`)
- `getAll(params?)` - Get all news with pagination and filtering
- `getById(id)` - Get specific news article
- `create(formData)` - Create new news article
- `update(id, formData)` - Update news article
- `delete(id)` - Delete news article
- `incrementView(id)` - Increment view count
- `like(id)` - Like/unlike news article

### Users (`users`)
- `getAll(params?)` - Get all users with pagination and filtering
- `create(userData)` - Create new user
- `update(id, userData)` - Update user
- `delete(id)` - Delete user

### Feedback (`feedback`)
- `getAll(params?)` - Get all feedback
- `create(feedbackData)` - Create new feedback
- `updateStatus(id, status, adminResponse?)` - Update feedback status
- `like(id)` - Like feedback

### Help Requests (`helpRequests`)
- `getAll(params?)` - Get all help requests
- `create(helpRequestData)` - Create new help request
- `update(id, updateData)` - Update help request
- `getById(id)` - Get specific help request

### Analytics (`analytics`)
- `getOverview()` - Get dashboard statistics
- `getNewsStats()` - Get news performance statistics

### Settings (`settings`)
- `get()` - Get system settings
- `update(settings)` - Update system settings

### File Upload (`upload`)
- `image(file)` - Upload image
- `document(file)` - Upload document
- `video(file)` - Upload video

## Parameters

### Pagination Parameters
```typescript
{
  page?: number      // Page number (default: 1)
  limit?: number     // Items per page (default: 10)
}
```

### News Filter Parameters
```typescript
{
  page?: number
  limit?: number
  category?: 'AMATANGAZO' | 'UBUZIMA' | 'UBUREZI' | 'UBUKUNGU' | 'IBITEKEREZO'
  search?: string
  status?: 'draft' | 'published' | 'archived'
  featured?: boolean
}
```

### User Filter Parameters
```typescript
{
  page?: number
  limit?: number
  search?: string
  role?: 'admin' | 'citizen'
  status?: 'active' | 'inactive'
}
```

## Error Handling

All API functions return a consistent response format:

```typescript
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
```

Example error handling:

```typescript
try {
  const response = await news.getById('news-id')
  if (response.success) {
    console.log('News found:', response.data)
  } else {
    console.log('Error:', response.message)
  }
} catch (error) {
  console.error('Network error:', error)
}
```

## File Upload

For file uploads, use FormData:

```typescript
import { news, upload } from '@/lib/api-client'

// Upload single image
const imageFile = new File([''], 'image.jpg')
const uploadResponse = await upload.image(imageFile)

// Create news with image
const formData = new FormData()
formData.append('title', 'News Title')
formData.append('excerpt', 'News excerpt')
formData.append('mainContent', 'Full content...')
formData.append('category', 'AMATANGAZO')
formData.append('author', 'Author Name')
formData.append('featured', 'true')
formData.append('image', imageFile)

const newsResponse = await news.create(formData)
```

## React Hook Example

```typescript
import { useState, useEffect } from 'react'
import { news } from '@/lib/api-client'

function useNewsData() {
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        const response = await news.getAll({ page: 1, limit: 10 })
        if (response.success) {
          setNewsData(response.data?.data || [])
        } else {
          setError(response.message)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return { newsData, loading, error }
}
```

## Configuration

The API client uses the configuration from `config.ts`:

```typescript
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
```

You can set the `NEXT_PUBLIC_API_URL` environment variable to point to your backend server.

## Advanced Usage

### Custom API Client Instance

```typescript
import { ApiClient } from '@/lib/api-client'

const customClient = new ApiClient('https://custom-api-url.com')
customClient.setAuthToken('custom-token')

const response = await customClient.request('/api/custom-endpoint', {
  method: 'POST',
  body: JSON.stringify({ data: 'value' })
})
```

### Direct API Client Access

```typescript
import { apiClient } from '@/lib/api-client'

// Set auth token manually
apiClient.setAuthToken('your-token')

// Make custom request
const response = await apiClient.request('/api/custom-endpoint', {
  method: 'POST',
  body: JSON.stringify({ custom: 'data' })
})
```

## TypeScript Support

All functions are fully typed with TypeScript interfaces for:
- Request parameters
- Response data
- Error messages

This provides excellent IntelliSense support and compile-time error checking.

## Examples

See `api-examples.ts` for comprehensive examples of all API operations including:
- Authentication flow
- CRUD operations
- File uploads
- Error handling
- React hooks
- Form submissions

## Backend Requirements

This API client is designed to work with the Rugalika News backend that implements the endpoints specified in the backend development prompt. Make sure your backend implements all the required endpoints and follows the expected request/response formats.
