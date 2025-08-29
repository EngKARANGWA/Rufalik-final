// Examples of how to use the API client
// This file shows practical usage examples for different API operations

import { 
  apiClient, 
  auth, 
  news, 
  users, 
  feedback, 
  helpRequests, 
  analytics, 
  settings, 
  upload 
} from './api-client'

// Example 1: Authentication Flow
export async function loginExample() {
  try {
    // Step 1: Send login code
    const sendCodeResponse = await auth.sendCode('karangwacyrille@gmail.com')
    if (sendCodeResponse.success) {
      console.log('Login code sent successfully')
      
      // Step 2: Verify code (user enters the code)
      const verifyResponse = await auth.verifyCode('karangwacyrille@gmail.com', '123456')
      if (verifyResponse.success) {
        console.log('Login successful:', verifyResponse.data?.user)
        return verifyResponse.data?.user
      }
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}

// Example 2: News Operations
export async function newsExamples() {
  try {
    // Get all news with pagination
    const allNews = await news.getAll({ 
      page: 1, 
      limit: 10, 
      category: 'AMATANGAZO' 
    })
    console.log('News:', allNews.data)

    // Get specific news article
    const newsArticle = await news.getById('news-id-here')
    console.log('News article:', newsArticle.data)

    // Create new news article
    const formData = new FormData()
    formData.append('title', 'Inyubako nshya z\'ibiro by\'umurenge')
    formData.append('excerpt', 'Inyubako nshya z\'ibiro by\'umurenge wa Rugalika zarangiye')
    formData.append('mainContent', 'Full content here...')
    formData.append('category', 'AMATANGAZO')
    formData.append('author', 'Umuyobozi w\'Umurenge')
    formData.append('featured', 'true')
    
    // Add image if available
    const imageFile = new File([''], 'image.jpg') // Replace with actual file
    formData.append('image', imageFile)

    const createResponse = await news.create(formData)
    if (createResponse.success) {
      console.log('News created:', createResponse.data)
    }

    // Like a news article
    await news.like('news-id-here')

    // Increment view count
    await news.incrementView('news-id-here')

  } catch (error) {
    console.error('News operations failed:', error)
  }
}

// Example 3: User Management
export async function userExamples() {
  try {
    // Get all users
    const allUsers = await users.getAll({ 
      page: 1, 
      limit: 20, 
      role: 'admin' 
    })
    console.log('Users:', allUsers.data)

    // Create new user
    const newUser = await users.create({
      email: 'newuser@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'citizen',
      phone: '0788123456',
      nationalId: '1234567890123456',
      employmentStatus: 'employed'
    })
    console.log('User created:', newUser.data)

    // Update user
    const updatedUser = await users.update('user-id-here', {
      phone: '0788123457'
    })
    console.log('User updated:', updatedUser.data)

  } catch (error) {
    console.error('User operations failed:', error)
  }
}

// Example 4: Feedback Operations
export async function feedbackExamples() {
  try {
    // Get all feedback
    const allFeedback = await feedback.getAll({ 
      page: 1, 
      limit: 10, 
      status: 'pending' 
    })
    console.log('Feedback:', allFeedback.data)

    // Create new feedback
    const newFeedback = await feedback.create({
      author: 'Citizen Name',
      title: 'Feedback Title',
      content: 'Feedback content here...'
    })
    console.log('Feedback created:', newFeedback.data)

    // Update feedback status (admin only)
    await feedback.updateStatus('feedback-id-here', 'approved', 'Thank you for your feedback')

    // Like feedback
    await feedback.like('feedback-id-here')

  } catch (error) {
    console.error('Feedback operations failed:', error)
  }
}

// Example 5: Help Requests
export async function helpRequestExamples() {
  try {
    // Get all help requests
    const allRequests = await helpRequests.getAll({ 
      page: 1, 
      limit: 10, 
      status: 'pending' 
    })
    console.log('Help requests:', allRequests.data)

    // Create new help request
    const newRequest = await helpRequests.create({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '0788123456',
      department: 'Ubutaka',
      description: 'Need help with land registration',
      status: 'pending',
      priority: 'normal'
    })
    console.log('Help request created:', newRequest.data)

    // Update help request (admin only)
    await helpRequests.update('request-id-here', {
      status: 'in_progress',
      adminResponse: 'We are working on your request'
    })

  } catch (error) {
    console.error('Help request operations failed:', error)
  }
}

// Example 6: Analytics
export async function analyticsExamples() {
  try {
    // Get analytics overview
    const overview = await analytics.getOverview()
    console.log('Analytics overview:', overview.data)

    // Get news statistics
    const newsStats = await analytics.getNewsStats()
    console.log('News statistics:', newsStats.data)

  } catch (error) {
    console.error('Analytics operations failed:', error)
  }
}

// Example 7: System Settings
export async function settingsExamples() {
  try {
    // Get system settings
    const currentSettings = await settings.get()
    console.log('Current settings:', currentSettings.data)

    // Update system settings
    const updatedSettings = await settings.update({
      siteName: 'Rugalika News Updated',
      contactEmail: 'newemail@rugalika.gov.rw'
    })
    console.log('Settings updated:', updatedSettings.data)

  } catch (error) {
    console.error('Settings operations failed:', error)
  }
}

// Example 8: File Upload
export async function uploadExamples() {
  try {
    // Upload image
    const imageFile = new File([''], 'image.jpg') // Replace with actual file
    const imageUpload = await upload.image(imageFile)
    console.log('Image uploaded:', imageUpload.data?.url)

    // Upload document
    const documentFile = new File([''], 'document.pdf') // Replace with actual file
    const documentUpload = await upload.document(documentFile)
    console.log('Document uploaded:', documentUpload.data?.url)

    // Upload video
    const videoFile = new File([''], 'video.mp4') // Replace with actual file
    const videoUpload = await upload.video(videoFile)
    console.log('Video uploaded:', videoUpload.data?.url)

  } catch (error) {
    console.error('Upload operations failed:', error)
  }
}

// Example 9: Using the API client directly
export async function directApiClientExample() {
  try {
    // Set custom auth token
    apiClient.setAuthToken('your-custom-token')

    // Make custom request
    const response = await apiClient.request('/api/custom-endpoint', {
      method: 'POST',
      body: JSON.stringify({ custom: 'data' })
    })
    console.log('Custom response:', response)

  } catch (error) {
    console.error('Direct API client operation failed:', error)
  }
}

// Example 10: Error Handling
export async function errorHandlingExample() {
  try {
    const response = await news.getById('non-existent-id')
    if (response.success) {
      console.log('News found:', response.data)
    } else {
      console.log('News not found:', response.message)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error occurred:', error.message)
    } else {
      console.error('Unknown error occurred')
    }
  }
}

// Example 11: React Hook Usage
export function useNewsData() {
  const [news, setNews] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        const response = await news.getAll({ page: 1, limit: 10 })
        if (response.success) {
          setNews(response.data?.data || [])
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

  return { news, loading, error }
}

// Example 12: Form Submission with File Upload
export async function submitNewsWithFiles(
  newsData: {
    title: string
    excerpt: string
    mainContent: string
    category: string
    author: string
    featured: boolean
  },
  files: {
    image?: File
    documents?: File[]
  }
) {
  try {
    const formData = new FormData()
    
    // Add text data
    Object.entries(newsData).forEach(([key, value]) => {
      formData.append(key, value.toString())
    })

    // Add image
    if (files.image) {
      formData.append('image', files.image)
    }

    // Add documents
    if (files.documents) {
      files.documents.forEach((file, index) => {
        formData.append(`documents`, file)
      })
    }

    const response = await news.create(formData)
    return response

  } catch (error) {
    console.error('Failed to submit news with files:', error)
    throw error
  }
}
