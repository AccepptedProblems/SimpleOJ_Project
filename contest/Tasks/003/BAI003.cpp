#include <bits/stdc++.h>
#define maxn 1003
#define maxc 1000000003

using namespace std;

int n, a[maxn], b[maxn], k;

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    cin >> n >> k;
    k = -k;
    for(int i=1; i<=n; i++)
        cin >> a[i];
    for(int i=1; i<=n; i++)
        cin >> b[i];
    for(int i=1; i<=n; i++)
    {
        k = k - a[i] + b[i];
        if(k >= 0)
        {
            cout << i;
            return 0;
        }
    }
    cout << -1;
}
