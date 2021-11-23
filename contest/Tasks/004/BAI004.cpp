#include <bits/stdc++.h>
#define maxn 1003
#define maxc 1000000003

using namespace std;

int n, a[maxn], m;

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    cin >> n >> m;
    for(int i=1; i<=n; i++)
        cin >> a[i];
    for(int i=1; i<=n; i++)
        for(int j=i+1; j<=n; j++)
            if(a[i] + a[j] == m)
            {
                cout << i << " " << j;
                return 0;
            }
    cout << -1;
}
