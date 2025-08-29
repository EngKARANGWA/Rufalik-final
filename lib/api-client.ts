// API Client for Rugalika News Backend
// This file provides a centralized way to call all API endpoints

import { API_URL } from './config'

// Types for API responses and requests
export interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'citizen'
  phone?: string
  nationalId?: string
  employmentStatus?: string
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export interface News {
  _id: string
  title: string
  excerpt: string
  mainContent: string
  category: 'AMATANGAZO' | 'UBUZIMA' | 'UBUREZI' | 'UBUKUNGU' | 'IBITEKEREZO'
  author: string
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  image?: string
  subContents: SubContent[]
  views: number
  likes: number
  createdAt: Date
  updatedAt: Date
}

export interface SubContent {
  _id: string
  title: string
  content: string
  type: 'text' | 'image' | 'video' | 'pdf'
  mediaUrl?: string
  explanation?: string
}

export interface Feedback {
  _id: string
  author: string
  title: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  likes: number
  comments: Comment[]
  category?: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  adminResponse?: string
  createdAt: Date
  updatedAt: Date
}

export interface HelpRequest {
  _id: string
  name: string
  email: string
  phone: string
  department: 'Ubutaka' | 'Ubuvuzi bw\'Amatungo' | 'Imiturire' | 'Irangamimerere' | 'Imibereho Myiza' | 'Amashyamba'
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  adminResponse?: string
  assignedTo?: string
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  _id: string
  content: string
  author: string
  itemId: string
  itemType: 'news' | 'feedback'
  likes: number
  createdAt: Date
}

export interface SystemSettings {
  _id: string
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  logo?: string
  enableNotifications: boolean
  enableComments: boolean
  enableRegistration: boolean
  maintenanceMode: boolean
  updatedBy: string
  updatedAt: Date
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// API Client Class
class ApiClient {
  private baseUrl: string
  private authToken: string | null = null

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl
    // Try to get auth token from localStorage
    if (typeof window !== 'undefined') {
      this.authToken = localStorage.getItem('rugalika_auth_token')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (this.authToken) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.authToken}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Set authentication token
  setAuthToken(token: string | null) {
    this.authToken = token
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('rugalika_auth_token', token)
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem('rugalika_auth_token')
    }
  }

  // Authentication endpoints
  async sendLoginCode(email: string): Promise<ApiResponse> {
    return this.request('/auth/send-code', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async verifyLoginCode(email: string, code: string): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await this.request<{ token: string; user: User }>('/auth/verify-code', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    })
    
    if (response.success && response.data?.token) {
      this.setAuthToken(response.data.token)
    }
    
    return response
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const response = await this.request<{ token: string }>('/auth/refresh-token', {
      method: 'POST',
    })
    
    if (response.success && response.data?.token) {
      this.setAuthToken(response.data.token)
    }
    
    return response
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/me')
  }

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  }

  async logout(): Promise<ApiResponse> {
    const response = await this.request('/auth/logout', {
      method: 'POST',
    })
    this.setAuthToken(null)
    return response
  }

  async validateToken(): Promise<ApiResponse> {
    return this.request('/auth/validate-token')
  }

  async requestPasswordReset(email: string): Promise<ApiResponse> {
    return this.request('/auth/request-password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async resetPassword(token: string, newPassword: string): Promise<ApiResponse> {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    })
  }

  // User Management endpoints
  async getUsers(params?: {
    page?: number
    limit?: number
    role?: string
    status?: string
  }): Promise<ApiResponse<PaginatedResponse<User>>> {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, value.toString())
      })
    }
    
    return this.request<PaginatedResponse<User>>(`/users?${searchParams.toString()}`)
  }

  async createUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async updateUser(id: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  }

  async deleteUser(id: string): Promise<ApiResponse> {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    })
  }

  // News Management endpoints
  async getNews(params?: {
    page?: number
    limit?: number
    category?: string
    status?: string
  }): Promise<ApiResponse<PaginatedResponse<News>>> {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, value.toString())
      })
    }
    
    return this.request<PaginatedResponse<News>>(`/news?${searchParams.toString()}`)
  }

  async getFeaturedNews(): Promise<ApiResponse<News[]>> {
    return this.request<News[]>('/news/featured')
  }

  async getLatestNews(): Promise<ApiResponse<News[]>> {
    return this.request<News[]>('/news/latest')
  }

  async getPopularNews(): Promise<ApiResponse<News[]>> {
    return this.request<News[]>('/news/popular')
  }

  async searchNews(params: {
    q: string
    page?: number
    limit?: number
  }): Promise<ApiResponse<PaginatedResponse<News>>> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, value.toString())
    })
    
    return this.request<PaginatedResponse<News>>(`/news/search?${searchParams.toString()}`)
  }

  async getNewsByCategory(category: string): Promise<ApiResponse<News[]>> {
    return this.request<News[]>(`/news/category/${category}`)
  }

  async getNewsById(id: string): Promise<ApiResponse<News>> {
    return this.request<News>(`/news/${id}`)
  }

  async createNews(newsData: FormData): Promise<ApiResponse<News>> {
    return this.request<News>('/news', {
      method: 'POST',
      body: newsData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  }

  async updateNews(id: string, newsData: FormData): Promise<ApiResponse<News>> {
    return this.request<News>(`/news/${id}`, {
      method: 'PUT',
      body: newsData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  }

  async deleteNews(id: string): Promise<ApiResponse> {
    return this.request(`/news/${id}`, {
      method: 'DELETE',
    })
  }

  async incrementNewsView(id: string): Promise<ApiResponse<{ views: number }>> {
    return this.request<{ views: number }>(`/news/${id}/view`, {
      method: 'POST',
    })
  }

  async likeNews(id: string): Promise<ApiResponse<{ likes: number }>> {
    return this.request<{ likes: number }>(`/news/${id}/like`, {
      method: 'POST',
    })
  }

  // Feedback Management endpoints
  async getFeedback(params?: {
    page?: number
    limit?: number
    status?: string
  }): Promise<ApiResponse<PaginatedResponse<Feedback>>> {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, value.toString())
      })
    }
    
    return this.request<PaginatedResponse<Feedback>>(`/feedback?${searchParams.toString()}`)
  }

  async createFeedback(feedbackData: {
    author: string
    title: string
    content: string
  }): Promise<ApiResponse<Feedback>> {
    return this.request<Feedback>('/feedback', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    })
  }

  async updateFeedbackStatus(id: string, status: 'approved' | 'rejected', adminResponse?: string): Promise<ApiResponse> {
    return this.request(`/feedback/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, adminResponse }),
    })
  }

  // Help Requests endpoints
  async createHelpRequest(helpRequestData: Omit<HelpRequest, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<HelpRequest>> {
    return this.request<HelpRequest>('/help-requests', {
      method: 'POST',
      body: JSON.stringify(helpRequestData),
    })
  }

  async getHelpRequests(params?: {
    page?: number
    limit?: number
    status?: string
    department?: string
    priority?: string
  }): Promise<ApiResponse<PaginatedResponse<HelpRequest>>> {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, value.toString())
      })
    }
    
    return this.request<PaginatedResponse<HelpRequest>>(`/help-requests?${searchParams.toString()}`)
  }

  async updateHelpRequest(id: string, updateData: {
    status?: string
    adminResponse?: string
    assignedTo?: string
  }): Promise<ApiResponse> {
    return this.request(`/help-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    })
  }

  // Analytics endpoints
  async getAnalyticsOverview(): Promise<ApiResponse<{
    totalUsers: number
    totalNews: number
    totalFeedback: number
    totalHelpRequests: number
    recentActivity: any[]
    topNews: { title: string; views: number }[]
    categoryStats: { category: string; count: number; percentage: number }[]
  }>> {
    return this.request('/analytics/overview')
  }

  async getAnalyticsUsers(): Promise<ApiResponse<any>> {
    return this.request('/analytics/users')
  }

  async getAnalyticsNews(): Promise<ApiResponse<any>> {
    return this.request('/analytics/news')
  }

  // System Settings endpoints
  async getSystemSettings(): Promise<ApiResponse<SystemSettings>> {
    return this.request<SystemSettings>('/settings')
  }

  async updateSystemSettings(settings: Partial<SystemSettings>): Promise<ApiResponse<SystemSettings>> {
    return this.request<SystemSettings>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    })
  }

  // File Upload endpoints
  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData()
    formData.append('image', file)
    
    return this.request<{ url: string }>('/upload/image', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  }

  async uploadVideo(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData()
    formData.append('video', file)
    
    return this.request<{ url: string }>('/upload/video', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  }

  async uploadDocument(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData()
    formData.append('document', file)
    
    return this.request<{ url: string }>('/upload/document', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient()

// Export the class for testing or custom instances
export { ApiClient }

// Convenience functions for common operations
export const auth = {
  sendCode: (email: string) => apiClient.sendLoginCode(email),
  verifyCode: (email: string, code: string) => apiClient.verifyLoginCode(email, code),
  refreshToken: () => apiClient.refreshToken(),
  getCurrentUser: () => apiClient.getCurrentUser(),
  updateProfile: (userData: Parameters<typeof apiClient.updateProfile>[0]) => apiClient.updateProfile(userData),
  logout: () => apiClient.logout(),
  validateToken: () => apiClient.validateToken(),
  requestPasswordReset: (email: string) => apiClient.requestPasswordReset(email),
  resetPassword: (token: string, newPassword: string) => apiClient.resetPassword(token, newPassword),
}

export const users = {
  getAll: (params?: Parameters<typeof apiClient.getUsers>[0]) => apiClient.getUsers(params),
  create: (userData: Parameters<typeof apiClient.createUser>[0]) => apiClient.createUser(userData),
  update: (id: string, userData: Parameters<typeof apiClient.updateUser>[1]) => apiClient.updateUser(id, userData),
  delete: (id: string) => apiClient.deleteUser(id),
}

export const news = {
  getAll: (params?: Parameters<typeof apiClient.getNews>[0]) => apiClient.getNews(params),
  getFeatured: () => apiClient.getFeaturedNews(),
  getLatest: () => apiClient.getLatestNews(),
  getPopular: () => apiClient.getPopularNews(),
  search: (params: Parameters<typeof apiClient.searchNews>[0]) => apiClient.searchNews(params),
  getByCategory: (category: string) => apiClient.getNewsByCategory(category),
  getById: (id: string) => apiClient.getNewsById(id),
  create: (newsData: Parameters<typeof apiClient.createNews>[0]) => apiClient.createNews(newsData),
  update: (id: string, newsData: Parameters<typeof apiClient.updateNews>[1]) => apiClient.updateNews(id, newsData),
  delete: (id: string) => apiClient.deleteNews(id),
  incrementView: (id: string) => apiClient.incrementNewsView(id),
  like: (id: string) => apiClient.likeNews(id),
}

export const feedback = {
  getAll: (params?: Parameters<typeof apiClient.getFeedback>[0]) => apiClient.getFeedback(params),
  create: (feedbackData: Parameters<typeof apiClient.createFeedback>[0]) => apiClient.createFeedback(feedbackData),
  updateStatus: (id: string, status: 'approved' | 'rejected', adminResponse?: string) => 
    apiClient.updateFeedbackStatus(id, status, adminResponse),
}

export const helpRequests = {
  create: (helpRequestData: Parameters<typeof apiClient.createHelpRequest>[0]) => apiClient.createHelpRequest(helpRequestData),
  getAll: (params?: Parameters<typeof apiClient.getHelpRequests>[0]) => apiClient.getHelpRequests(params),
  update: (id: string, updateData: Parameters<typeof apiClient.updateHelpRequest>[1]) => apiClient.updateHelpRequest(id, updateData),
}

export const analytics = {
  getOverview: () => apiClient.getAnalyticsOverview(),
  getUsers: () => apiClient.getAnalyticsUsers(),
  getNews: () => apiClient.getAnalyticsNews(),
}

export const settings = {
  get: () => apiClient.getSystemSettings(),
  update: (settings: Parameters<typeof apiClient.updateSystemSettings>[0]) => apiClient.updateSystemSettings(settings),
}

export const upload = {
  image: (file: File) => apiClient.uploadImage(file),
  video: (file: File) => apiClient.uploadVideo(file),
  document: (file: File) => apiClient.uploadDocument(file),
}
