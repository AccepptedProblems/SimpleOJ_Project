#include <bits/stdc++.h>
#define maxn 1000003
#define maxc 1000000003

using namespace std;

int n, a[maxn], m, k, ans = 0;

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    cin >> n >> k;
    k = n / k;
    for(int i=0; i<n; i++)
        cin >> a[i];
    for(int i=0; i<k; i++)
        for(int j=i+k; j<n; j+=k)
            if(a[j] != a[i])
            {
                cout << "NO";
                return 0;
            }
    cout << "YES";
}
