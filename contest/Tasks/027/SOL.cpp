#include <bits/stdc++.h>
#define maxn 103
#define ln 1000000003

using namespace std;

int n, a[maxn][maxn], ans = -ln, m;

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    cin >> n >> m;
    for(int i=1; i<=n; i++)
        for(int j=1; j<=m; j++)
            cin >> a[i][j];
    for(int t=-n+1; t<=n-1; t++)
    {
        int Sum = 0;
        for(int i=1; i<=n; i++)
        {
            int j = i + t;
            if(j < 0)   continue;
            Sum += a[i][j];
        }
        ans = max(ans, Sum);
    }
    cout << ans;
}
