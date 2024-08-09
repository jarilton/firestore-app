const mockCollection = jest.fn(() => ({
  addDoc: jest.fn(),
  onSnapshot: jest.fn(),
}));

const mockFirestore = {
  collection: mockCollection,
  deleteDoc: jest.fn(),
  updateDoc: jest.fn(),
};

export const getFirestore = jest.fn(() => mockFirestore);
export const collection = mockCollection;
export const addDoc = mockCollection().addDoc;
export const onSnapshot = mockCollection().onSnapshot;
export const deleteDoc = mockFirestore.deleteDoc;
export const updateDoc = mockFirestore.updateDoc;
