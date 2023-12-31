import { NextResponse, NextRequest } from 'next/server';
import { firestore } from '../../../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  const data: any = [];

  const querySnapshot = await getDocs(collection(firestore, 'prayers'));
  querySnapshot.forEach((doc) => {
    const snapData = doc.data();
    data.push(doc.data());
  });

  return NextResponse.json(data);
}
