#include <bits/stdc++.h>
#define maxn 1000003
#define maxc 1000000003

using namespace std;

int n, a[maxn], m, k, ans = 0, Sum = 0;

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    cin >> n >> k;
    for(int i=1; i<=n; i++)
        cin >> a[i], Sum += a[i];
    if(Sum % k)
    {
        cout << "NO";
        return 0;
    }
    Sum /= k;
    for(int i=1; i<=n;)
    {
        int pos = i;
        int Cur = a[pos];
        while(Cur < Sum && pos <= n)
        {
            pos++;
            Cur += a[pos];
        }
        i = pos + 1;
        if(Cur != Sum)
        {
            cout << "NO";
            return 0;
        }
    }
    cout << "YES";
}
